import { MODE } from '@c/CodeEditor';

const options = [];
for (const item in MODE) {
  options.push({ value: MODE[item], label: item });
}
export default [
  {
    field: 'mode',
    label: '模式',
    component: 'Select',
    componentProps: {
      options,
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
];
