export default {
  label: '单行表单',
  field: '',
  type: 'containerItem',
  formItem: true,
  icon: 'ant-design:border-bottom-outlined',
  componentProps: {
    onRowDelete__func: '',
    onRowDelete__params: ['{idx,data,row}'],
    onRowInsert__func: '',
    onRowInsert__params: ['{idx,data,row}'],
  },
  children: [],
  options: {
    gutter: 0,
  },
};
