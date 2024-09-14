// const options = [];
// for (const item in MODE) {
//   options.push({ value: MODE[item], label: item });
// }
export default [
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
    field: 'editorTitle',
    label: '编辑器标题',
    component: 'Input',
  },
  {
    category: 'control',
    field: 'bordered',
    label: '显示边框',
    component: 'Checkbox',
  },
  {
    category: 'control',
    field: 'autoFormat',
    label: '自动格式化',
    component: 'Checkbox',
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
];
