export default [
  {
    field: 'listType',
    label: '显示类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'text', value: 'text' },
        { label: 'picture', value: 'picture' },
        { label: 'picture-card', value: 'picture-card' },
      ],
    },
  },
];
