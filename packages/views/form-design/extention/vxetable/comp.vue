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
  import { reactive, ref } from 'vue';
  import { ActionItem, TableAction } from '@c/Table';

  import { useMessage } from '@h/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './tableData';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { demoListApi } from '@/api/demo/table';
  import { formatItem, formatItemByContext } from '../../utils/index';

  const attrs = useAttrs();

  const { createMessage } = useMessage();

  const tableRef = ref<VxeGridInstance>();

  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    keepSource: true,
    editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: vxeTableColumns,
    toolbarConfig: {
      buttons: [
        {
          content: '在第一行新增',
          buttonRender: {
            name: 'AButton',
            props: {
              type: 'primary',
              preIcon: 'mdi:page-next-outline',
            },
            events: {
              click: () => {
                tableRef.value?.insert({ name: '新增的' });
                createMessage.success('新增成功');
              },
            },
          },
        },
        {
          content: '在最后一行新增',
          buttonRender: {
            name: 'AButton',
            props: {
              type: 'warning',
            },
            events: {
              click: () => {
                tableRef.value?.insertAt({ name: '新增的' }, -1);
              },
            },
          },
        },
      ],
    },
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
  });
  //const { actions } = attrs;
  // let actions = toRaw(attrs.actions);
  // 操作按钮（权限控制）
  // formatItem(actions);
  const createActions = (record) => {
    // actions = formatItemByContext(actions, { record, tableRef });
    const actions: ActionItem[] = [
      {
        label: '详情',
        onClick__func: `
          console.log(this.record);
        `,
        onClick: () => {
          console.log(record);
        },
      },
      {
        label: '编辑',
        onClick: () => {},
      },
      {
        label: '删除',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: () => {
            tableRef.value?.remove(record);
          },
        },
      },
    ];

    return actions;
  };
</script>
