import { MODE } from '@c/CodeEditor';

const options = [];
for (const item in MODE) {
  options.push({ value: MODE[item], label: item });
}
export default [
  {
    name: 'mode',
    label: '模式',
    component: 'Select',
    componentProps: {
      options,
    },
  },
  {
    name: 'height',
    label: '高度',
    component: 'InputNumber',
  },
  {
    name: 'prefix',
    label: '前缀',
    component: 'Input',
  },
  {
    name: 'suffix',
    label: '后缀',
    component: 'Input',
  },
  {
    category: 'control',
    name: 'bordered',
    label: '显示边框',
  },
  {
    category: 'control',
    name: 'autoFormat',
    label: '自动格式化',
  },
];
