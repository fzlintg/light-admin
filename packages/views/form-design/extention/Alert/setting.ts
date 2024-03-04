export default [
  {
    name: 'type',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '成功', value: 'success' },
        { label: '警告', value: 'warning' },
      ],
    },
  },
  {
    name: 'message',
    label: '消息',
    component: 'Input',
    componentProps: {},
  },
];
