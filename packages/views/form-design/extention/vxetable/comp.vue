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
  import { cloneDeep } from 'lodash-es';

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
  let actionsTpl = cloneDeep(toRaw(attrs.actions));
  formatItem(actionsTpl);

  function replaceQuotes(match, group) {
    var replacedStr = group.replace(/\\"/g, '"').replace(/\\n/g, '  '); // 替换含有\"为“
    return '()=>{' + replacedStr + '}'; // 在开头添加()=>{}，在结尾添加}
  }
  actionsTpl = JSON.stringify(actionsTpl).replace(/"\$_begin(.*?)\$_end"/g, replaceQuotes); //好不容易修改成
  const createActions = (record) => {
    return new Function('context', `return ${actionsTpl}`)({ record, tableRef });
  };
</script>
