export default [
  {
    name: 'type',
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
  },
  {
    name: 'message',
    label: '消息',
    component: 'Input',
    componentProps: {},
  },
  {
    name: 'showIcon',
    label: '显示图标',
    category: 'control',
  },
  {
    name: 'closable',
    label: '可关闭',
    category: 'control',
  },
];
