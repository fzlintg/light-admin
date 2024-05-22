import { MODE } from '@c/CodeEditor';

export default [
  {
    field: 'afterFetch__func',
    label: '获取数据后处理',
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
  {
    field: 'params__tpl',
    label: '参数模版',
    component: 'InputTextArea',
    componentProps: {
      autoSize: { minRows: 2 },
    },
  },
];
