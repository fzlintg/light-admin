<template>
  <div>
    <light-form :logic="`crud.${state}.form`" @submit="loadData" :options="tableDict" />
    <light-form :logic="`crud.${state}.insert`" @submit="saveData" ref="insertFormRef" :options="tableDict" />
    <VxeBasicTable ref="tableRef" v-bind="gOptions" v-if="ifshow" @insert-form="insertForm">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </VxeBasicTable>
    <Modal v-model:open="detailOpen" :width="900" title="数据详情" @ok="detailOpen = false">
      <Description size="middle" :bordered="false" :column="2" :data="detailData" :schema="detailSchema" />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { Description } from '@c/Description';
import Modal from '@c/Modal/src/BasicModal.vue';
import { useRuleFormItem } from '@h/component/useFormItem';
import { PropType, ref, useAttrs, toRefs, onMounted, watchEffect, watch, computed } from 'vue';
import { defHttp as axios } from '@utils/http/axios';
import { TableAction } from '@c/Table';
import { VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
import { TransObjectToCode, formatFunc } from '../../utils/index';
import { cloneDeep } from 'lodash-es';
import { useMessage } from '@h/web/useMessage';
import * as jsonpatch from 'fast-json-patch/index.mjs';
import { isObject } from 'xe-utils';

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
  createActions = ref((row) => { }),
  detailOpen = ref(false),
  detailSchema = ref([]),
  detailData = ref({});

const jsonPath = {
  checkbox: { path: '/columns/0', value: { type: 'checkbox', width: 50 } },
};
const tableDict = ref({})
const editForm = computed(() => {
  return insertFormRef.value.vformRef.getItemRef('modal_1');
});
const jsonAct = (json, path, op) => {
  jsonpatch.applyPatch(json, [{ op, ...jsonPath[path] }]);
};
const loadDict = async () => {
  tableDict.value = await axios.get({
    url: `/api/crud/getQueryDict/${props.dbTable.replace('.', '/')}`
  });
};

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
  ifshow.value = true;
};
watch([() => props.checkbox, state], async () => {
  await loadOptions();
  tableRef.value.commitProxy('query');
});
onMounted(async () => {
  await loadOptions();
  await loadDict();
  detailSchema.value = await axios.get({
    url: `/api/crud/getDescSchema/${state.value.split('.').join('/')}`,
  });
});

const loadData = (form) => {
  tableRef.value.commitProxy('query', { form });
};
const insertForm = () => {
  editForm.value.show({});
};
const openDetail = (data) => {
  // let showData = cloneDeep(data);
  // for (let item in showData) {
  //   if (isObject(showData[item])) showData[item] = JSON.stringify(showData[item]);
  // }
  detailData.value = data;
  detailOpen.value = true;
};
const saveData = (data) => {
  tableRef.value.insert(data);
  tableRef.value.commitProxy('save');
};
</script>
