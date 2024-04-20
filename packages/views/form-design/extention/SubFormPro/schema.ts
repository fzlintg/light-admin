export default {
  label: '可变表单',
  field: '',
  type: 'containerItem',
  formItem: true,
  icon: 'ant-design:border-bottom-outlined',
  componentProps: {
    onRowDelete__params: ['{idx,data,row}'],
    onRowInsert__params: ['{idx,data,row}'],
    onRowAdd__params: ['{idx,data,row}'],
    onRowChange__params: ['data'],
  },
  defaultShow: [],
  childProps: {},
  children: [],
  options: {
    gutter: 0,
  },
};
