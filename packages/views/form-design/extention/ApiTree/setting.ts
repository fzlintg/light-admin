import { MODE } from '@c/CodeEditor';

export default [
  {
    name: 'afterFetch__func',
    label: '获取数据处理',
    component: 'CodeInput',
    componentProps: {
      mode: MODE.JS,
      buttonText: '编辑',
      editorTitle: '代码编辑',
      bordered: true,
      autoFormat: true,
      prefix: 'function afterFetch(v){',
    },
  },
];
