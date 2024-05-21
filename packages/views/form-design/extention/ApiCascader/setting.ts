import { MODE } from '@c/CodeEditor';

export default [
  {
    field: 'apiParamKey',
    component: 'Input',
    label: '参数名称',
  },
  {
    field: 'api__func',
    label: 'api',
    component: 'CodeInput',
    componentProps: {
      mode: MODE.JS,
      buttonText: '编辑',
      editorTitle: '代码编辑',
      bordered: true,
      autoFormat: true,
      prefix: 'function({axios,nextTick},params){',
      surfix: '}',
    },
  },
];
