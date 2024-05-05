export default {
  label: 'vxe表格',
  field: '',
  type: 'showItem',
  formItem: false,
  icon: 'ant-design:border-bottom-outlined',
  componentProps: {
    height: 600,
    api: {
      columns: '/table/getVxeColumn',
    },
    actions: [
      {
        label: '详情',
        onClick__func: `console.log(record);`,
      },
      {
        label: '编辑',
        onClick__func: ``,
      },
      {
        label: '删除',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm__func: `tableRef.value?.remove(record);`,
        },
      },
    ],
    gridOptions: {
      editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
      proxyConfig: {
        ajax: {
          query__func: `return demoListApi({
              page: page.currentPage,
              pageSize: page.pageSize,
              ...form})
            `,
          query__params: ['page', 'form'],
          queryAll__func: `return await demoListApi(form);`,
          queryAll__params: ['form'],
        },
      },
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
                click__func: `tableRef.value?.insert({ name: '新增的' });
createMessage.success('新增成功');`,
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
                click__func: `tableRef.value?.insertAt({ name: '新增的' }, -1);`,
              },
            },
          },
        ],
      },
    },
  },
  children: [],
  options: {
    gutter: 0,
  },
};
