<template>
  <div>
    <light-form :logic="`crud.${state}.form`" @submit="loadData" />
    <light-form :logic="`crud.${state}.insert`" @submit="saveData" ref="insertFormRef" />
    <VxeBasicTable ref="tableRef" v-bind="gOptions" v-if="ifshow" @insert-form="insertForm">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </VxeBasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { PropType, ref, useAttrs, toRefs, onMounted, watchEffect, watch } from 'vue';
  import { defHttp as axios } from '@utils/http/axios';
  import { TableAction } from '@c/Table';
  import { VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { TransObjectToCode, formatFunc } from '../../utils/index';
  import { cloneDeep } from 'lodash-es';
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
    createActions = ref((row) => {});
  const jsonPath = {
    checkbox: { path: '/columns/0', value: { type: 'checkbox', width: 50 } },
  };
  const jsonAct = (json, path, op) => {
    jsonpatch.applyPatch(json, [{ op, ...jsonPath[path] }]);
  };
  const loadOptions = async () => {
    let { gridOptions, actionOptions } = await axios.get({
      url: `/api/crud/getGridOptions/${props.dbTable.replace('.', '/')}`,
    });

    const actionsTpl = TransObjectToCode(cloneDeep(actionOptions));
    createActions.value = (record) => {
      return new Function('{ record, tableRef,axios }', `return ${actionsTpl}`)({
        record,
        tableRef,
        axios,
      });
    };
    if (props.checkbox) jsonAct(gridOptions, 'checkbox', 'add');
    // else jsonAct(gridOptions, 'checkbox', 'remove');
    //  else jsonpatch.applyPatch(gridOptions, [{ path: '/columns/0', op: 'remove' }]);
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
  });
  onMounted(async () => {
    await loadOptions();
  });

  const loadData = (form) => {
    tableRef.value.commitProxy('query', { form });
  };
  const insertForm = () => {
    insertFormRef.value.vformRef.getItemRef('modal_1').show({});
  };
  const saveData = (data) => {
    tableRef.value.insert(data);
    tableRef.value.commitProxy('save');
  };
</script>
