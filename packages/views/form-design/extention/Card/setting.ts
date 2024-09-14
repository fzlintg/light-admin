export default [
  {
    component: 'CodeInput',
    label: '工具栏渲染',
    field: 'slots_extra',
    componentProps: {
      mode: 'html',
      buttonText: '编辑',
      editorTitle: '工具栏编辑',
      bordered: true,
      autoFormat: true,
      prefix: '',
      suffix: '',
      defaultValue: '',
    },
  },
];
