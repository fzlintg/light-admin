export default [
  {
    field: 'size',
    label: '尺寸',
    component: 'Select',
    componentProps: {
      options: [
        { label: '小', value: 'small' },
        { label: '中', value: 'middle' },
        { label: '大', value: 'large' },
      ],
    },
  },
];
