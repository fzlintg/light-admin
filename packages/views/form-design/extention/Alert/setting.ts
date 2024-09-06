export default [
  {
    field: 'type',
    label: '类型',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '成功', value: 'success' },
        { label: '警告', value: 'warning' },
        { label: '信息', value: 'info' },
        { label: '错误', value: 'error' },
      ],
    },
    defaultValue: 'success',
  },
];
