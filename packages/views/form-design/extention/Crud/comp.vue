<template>
  <div>
    <light-form :logic="`crud.${state}.form`" @submit="loadData" :options="tableOptions" />
    <light-form
      :logic="`crud.${state}.insert`"
      @submit="saveData"
      ref="insertFormRef"
      :options="tableOptions"
    />
    <VxeBasicTable
      ref="tableRef"
      v-bind="gOptions"
      keep-source
      v-if="ifshow"
      @insert-form="insertForm"
    >
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </VxeBasicTable>
    <Modal v-model:open="detailOpen" :width="900" title="数据详情" @ok="detailOpen = false">
      <Description :column="2" :data="detailData" :schema="detailSchema" />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
  import { Description } from '@c/Description';
  import Modal from '@c/Modal/src/BasicModal.vue';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import {
    PropType,
    ref,
    unref,
    useAttrs,
    toRefs,
    onMounted,
    watchEffect,
    watch,
    computed,
    provide,
  } from 'vue';
  import { defHttp as axios } from '@utils/http/axios';
  import { TableAction } from '@c/Table';
  import { VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { TransObjectToCode, formatFunc } from '../../utils/index';
  import { cloneDeep, merge, isNil } from 'lodash-es';
  import { useMessage } from '@h/web/useMessage';
  import * as jsonpatch from 'fast-json-patch/index.mjs';

  const props = defineProps({
    dbTable: {
      type: String as PropType<string>,
      default: '',
    },
    checkbox: {
      type: Boolean,
      default: true,
    },
  });
  const createMessage = useMessage();
  const [state] = useRuleFormItem(props, 'dbTable', 'change');
  const insertFormRef = ref(null);
  //const [checkState] = useRuleFormItem(props, 'checkbox', 'change');
  // const { schema } = toRefs(useAttrs());
  const gOptions = ref({}),
    tableRef = ref(),
    ifshow = ref(false),
    createActions = ref((row) => {}),
    detailOpen = ref(false),
    detailSchema = ref([]),
    detailData = ref({}),
    columnAttr = ref({});
  const jsonPath = {
    checkbox: { path: '/columns/0', value: { type: 'checkbox', width: 50 } },
  };
  //const tableDict = ref({ options: [], map: {} });
  const tableOptions = ref([]);
  const tableMap = ref({});
  provide('options', tableOptions);
  const editForm = computed(() => {
    return insertFormRef.value.vformRef.getItemRef('modal_1');
  });
  const jsonAct = (json, path, op) => {
    jsonpatch.applyPatch(json, [{ op, ...jsonPath[path] }]);
  };
  const loadDict = async () => {
    let { options, map } = await axios.get({
      url: `/api/crud/getQueryDict/${props.dbTable.replace('.', '/')}`,
    });
    tableOptions.value = options;
    tableMap.value = map;
    merge(gOptions.value, { formConfig: { dict: { options, map } } });
  };
  // const fixEditRecord = (record) => {
  //   let result = cloneDeep(record);
  //   for (const name in result) {
  //     if (isNil(result[name]) || !columnAttr.value[name]?.formatter) continue;
  //     if (columnAttr.value[name]?.formatter == 'dict') {
  //       result[name] = result[name].id;
  //     } else if (columnAttr.value[name]?.formatter == 'dicts') {
  //       result[name] = result[name].map((i) => i.id);
  //     }
  //   }
  //   return result;
  // };
  const loadOptions = async () => {
    let { gridOptions, actionOptions } = await axios.get({
      url: `/api/crud/getGridOptions/${props.dbTable.replace('.', '/')}`,
    });

    const actionsTpl = TransObjectToCode(cloneDeep(actionOptions));
    createActions.value = (record) => {
      return new Function('{ record, tableRef,axios,editForm,openDetail }', `return ${actionsTpl}`)(
        {
          record,
          tableRef,
          axios,
          editForm,
          openDetail,
        },
      );
    };
    if (props.checkbox) {
      jsonAct(gridOptions, 'checkbox', 'add');
    } else
      gridOptions.toolbarConfig.buttons = gridOptions.toolbarConfig.buttons.filter(
        (item) => item.code != 'delete',
      );

    const gridTpl = TransObjectToCode(cloneDeep(gridOptions));
    const gridData = new Function('{tableRef,createMessage,axios}', `return ${gridTpl}`)({
      tableRef,
      createMessage,
      axios,
    });
    gOptions.value = gridData;
    gridData.columns.forEach((item) => {
      columnAttr.value[item.field] = item;
    });
  };
  watch([() => props.checkbox, state], async () => {
    await loadOptions();
    ifshow.value = true;
    tableRef.value.commitProxy('query');
  });
  onMounted(async () => {
    await loadOptions();
    await loadDict();
    ifshow.value = true;
    detailSchema.value = await axios.get({
      url: `/api/crud/getDescSchema/${state.value.split('.').join('/')}`,
    });
  });

  const loadData = (form) => {
    tableRef.value.commitProxy('query', { form });
  };
  const insertForm = () => {
    editForm.value.setProps(({ myProps }) => {
      myProps.value = { title: '新增数据' };
    });
    editForm.value.show({}, { type: 'insert' });
  };
  const openDetail = (data) => {
    detailData.value = cloneDeep(data);
    let mapData = unref(tableMap);
    for (const name in mapData) {
      if (columnAttr.value[name]?.cellRender?.name == 'dict') {
        if (Array.isArray(detailData.value[name])) {
          detailData.value[name] = detailData.value[name].map((item) => mapData[name][item]);
          // detailData.value[name] = tableDict.value[name]
          //   .filter((item) => {
          //     return detailData.value[name].includes(item.value);
          //   })
          //   .map((item) => item.label);
        } else {
          detailData.value[name] = mapData[name][detailData.value[name]];
          // detailData.value[name] = tableDict.value[name].find(
          //   (v) => v.value == detailData.value[name],
          // ).label;
        }
      }
    }

    //     case 'dict':
    //       detailData.value[name] = detailData.value[name]?.id;
    //       break;
    //     case 'dicts':
    //       detailData.value[name] = detailData.value[name]?.map((item) => item.id);
    //       break;
    //   }
    // }
    detailOpen.value = true;
  };
  const saveData = ({ data, row, type = 'insert' }) => {
    if (type == 'insert') tableRef.value.insert(data);
    else Object.assign(row, data);

    tableRef.value.commitProxy('save');
  };
</script>
