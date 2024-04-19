export default {
  label: 'vxetable',
  field: '',
  type: 'showItem',
  formItem: false,
  icon: 'ant-design:border-bottom-outlined',
  componentProps: {
    height: 600,
    actions: [
      {
        label: '详情',
        onClick__func: `console.log(context.record);`,
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
          confirm__func: `context.tableRef.value?.remove(context.record);`,
        },
      },
    ],
  },
  children: [],
  options: {
    gutter: 0,
  },
};
