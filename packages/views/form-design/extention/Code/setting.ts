// const options = [];
// for (const item in MODE) {
//   options.push({ value: MODE[item], label: item });
// }
export default [
  {
    field: 'theme',
    label: '主题',
    component: 'Select',
    componentProps: {
      options: [
        { value: 'default', label: '默认' },
        { value: 'dark', label: '暗黑' },
      ],
    },
  },
  {
    field: 'mode',
    label: '模式',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: 'json', value: 'json' },
        { label: 'javascript', value: 'javascript' },
        { label: 'html', value: 'html' },
        { label: 'sql', value: 'sql' },
      ],
    },
  },
  {
    field: 'prefix',
    label: '前缀',
    component: 'Input',
  },
  {
    field: 'suffix',
    label: '后缀',
    component: 'Input',
  },
  {
    category: 'control',
    field: 'bordered',
    label: '显示边框',
  },

  {
    category: 'control',
    field: 'autoFormat',
    label: '自动格式化',
  },
];
