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
        onClick__func: `
 
          console.log(this.record);
        `,
        // onClick__params: ['context'],
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
          confirm__func: `
            this.tableRef.value?.remove(this.record);
          `,
          // confirm__params: ['context'],
        },
      },
    ],
  },
  children: [],
  options: {
    gutter: 0,
  },
};
