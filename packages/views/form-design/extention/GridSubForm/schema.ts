export default {
  label: '多行表单',
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
  // columns: [
  //   {
  //     span: 24,
  //     children: [],
  //   },
  // ],
  children: [],
  colProps: { span: 24 },
  options: {
    gutter: 0,
  },
};
