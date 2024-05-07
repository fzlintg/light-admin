<template>
  <div :style="{ width: '100%', height: attrs.height + 'px' }">
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" v-if="ifshow">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </VxeBasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, unref } from 'vue';
  import { ActionItem, TableAction } from '@c/Table';
  import { defHttp } from '@utils/http/axios';
  import { useMessage } from '@h/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './tableData';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { demoListApi } from '@/api/demo/table';
  import { TransObjectToCode } from '../../utils/index';
  import { cloneDeep } from 'lodash-es';

  const attrs = useAttrs();
  const { createMessage } = useMessage();
  const tableRef = ref<VxeGridInstance>(),
    gridProps = ref({}),
    createActions = ref((row) => {}),
    gridOptions = ref({}),
    ifshow = ref(false);

  watchEffect(async () => {
    const actionsTpl = TransObjectToCode(cloneDeep(toRaw(attrs.actions)));
    createActions.value = (record) => {
      return new Function('{ record, tableRef }', `return ${actionsTpl}`)({
        record,
        tableRef,
      });
    };
  });

  watchEffect(async () => {
    const gridTpl = TransObjectToCode(cloneDeep(toRaw(attrs.gridOptions)));
    gridProps.value = new Function('{tableRef,createMessage,demoListApi }', `return ${gridTpl}`)({
      tableRef,
      createMessage,
      demoListApi,
    });
    gridOptions.value = {
      id: 'VxeTable',
      keepSource: true,
      toolbarConfig: {},
      height: 'auto',
      columns: gridOptions.value.columns,
      //  ...gridOptions.value,
      ...gridProps.value,
    };
  });
  onMounted(async () => {
    gridOptions.value.columns = await defHttp.get({ url: attrs.api.columns });
    ifshow.value = true;
  });

  //});
</script>
