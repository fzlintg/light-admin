<template>
  <div :style="{ width: '100%', height: attrs.height + 'px' }">
    <VxeBasicTable ref="tableRef" v-bind="gridOptions">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </VxeBasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { ActionItem, TableAction } from '@c/Table';

  import { useMessage } from '@h/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './tableData';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { demoListApi } from '@/api/demo/table';
  import { formatItem, formatItemByContext, TransObjectToCode } from '../../utils/index';
  import { cloneDeep } from 'lodash-es';

  const attrs = useAttrs();
  const { createMessage } = useMessage();
  const tableRef = ref<VxeGridInstance>();
  const gridProps = ref({});
  const createActions = ref(() => {});
  watchEffect(() => {
    const gridTpl = TransObjectToCode(cloneDeep(toRaw(attrs.gridOptions)));
    gridProps.value = new Function('{tableRef,createMessage }', `return ${gridTpl}`)({
      tableRef,
      createMessage,
    });
  });
  watchEffect(() => {
    const actionsTpl = TransObjectToCode(cloneDeep(toRaw(attrs.actions)));
    createActions.value = (record) => {
      return new Function('{ record, tableRef }', `return ${actionsTpl}`)({ record, tableRef });
    };
  });
  const gridOptions = computed(() => {
    return {
      id: 'VxeTable',
      keepSource: true,
      editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
      columns: vxeTableColumns,
      toolbarConfig: {},
      formConfig: {
        enabled: true,
        items: vxeTableFormSchema,
      },
      height: 'auto',
      proxyConfig: {
        ajax: {
          query: async ({ page, form }) => {
            return demoListApi({
              page: page.currentPage,
              pageSize: page.pageSize,
              ...form,
            });
          },
          queryAll: async ({ form }) => {
            return await demoListApi(form);
          },
        },
      },
      ...unref(gridProps),
    };
  });
  // const gridOptions = reactive<BasicTableProps>();
  // const show = ref(true);
  // const refresh;
</script>
