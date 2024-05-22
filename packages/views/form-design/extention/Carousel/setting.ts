export default [
  {
    field: 'dotPosition',
    component: 'RadioButtonGroup',
    label: '展示方式位置',
    componentProps: {
      options: [
        { value: 'top', label: '顶' },
        { value: 'bottom', label: '底' },
        { value: 'left', label: '左' },
        { value: 'right', label: '右' },
      ],
    },
  },
  {
    field: 'background',
    component: 'ColorPicker',
    label: '背景颜色',
    componentProps: {},
  },
];
