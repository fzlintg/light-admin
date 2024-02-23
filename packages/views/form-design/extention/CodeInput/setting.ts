import { MODE } from '@c/CodeEditor';

const options = [];
for (const item in MODE) {
  options.push({ value: MODE[item], label: item });
}
export default [
  {
    name: 'buttonText',
    label: '按钮文本',
    component: 'Input',
  },
  {
    name: 'mode',
    label: '模式',
    component: 'Select',
    componentProps: {
      options,
    },
  },
  {
    name: 'editorTitle',
    label: '编辑器标题',
    component: 'Input',
  },
  {
    category: 'control',
    name: 'bordered',
    label: '显示边框',
    component: 'Checkbox',
  },
  {
    category: 'control',
    name: 'autoFormat',
    label: '自动格式化',
    component: 'Checkbox',
  },
];
