export default [
  {
    field: 'type',
    label: '类型',
    component: 'Select',
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
  {
    field: 'message',
    label: '消息',
    component: 'Input',
    componentProps: {},
    defaultValue: '',
  },
  {
    field: 'showIcon',
    label: '显示图标',
    category: 'control',
    defaultValue: true,
  },
  {
    field: 'closable',
    label: '可关闭',
    category: 'control',
    defaultValue: true,
  },
];
