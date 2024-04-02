export default [
  {
    field: 'mode',
    label: '位置',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '上', value: 'top' },
        { label: '右', value: 'right' },
        { label: '下', value: 'bottom' },
        { label: '左', value: 'left' },
      ],
    },
  },
  {
    field: 'maskClosable',
    label: '点击遮罩关闭',
    category: 'control',
  },
  {
    field: 'mask',
    label: '显示遮罩',
    category: 'control',
  },
  {
    field: 'closable',
    label: '显示关闭按钮',
    category: 'control',
  },
];
