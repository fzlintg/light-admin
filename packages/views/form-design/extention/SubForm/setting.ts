import { MODE } from '@c/CodeEditor';

export default [
  {
    component: 'CodeInput',
    label: 'onRowDelete函数',
    name: 'onRowDelete__func',
    type: 'showItem',
    // field: 'slotsName.extra',
    componentProps: {
      mode: MODE.HTML,
      buttonText: '编辑',
      editorTitle: '删除事件',
      bordered: true,
      autoFormat: true,
      prefix: 'function onRowDelete(){',
      suffix: '}',
    },
    defaultValue: '',
  },
];
