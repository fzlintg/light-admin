import { MODE } from '@c/CodeEditor';

export default [
  {
    component: 'CodeInput',
    label: 'onClick函数',
    name: 'onClick__func',
    type: 'showItem',
    // field: 'slotsName.extra',
    componentProps: {
      mode: MODE.HTML,
      buttonText: '编辑',
      editorTitle: '点击事件',
      bordered: true,
      autoFormat: true,
      prefix: 'function onClick(){',
      suffix: '}',
    },
    defaultValue: '',
  },
];
