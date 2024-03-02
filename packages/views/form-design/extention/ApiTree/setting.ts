import { MODE } from '@c/CodeEditor';

export default [
  {
    name: 'api__func',
    label: '获取数据',
    component: 'CodeInput',
    componentProps: {
      mode: MODE.JS,
      buttonText: '编辑',
      editorTitle: '代码编辑',
      bordered: true,
      autoFormat: true,
      prefix: 'function api(){',
    },
  },
  {
    name: 'afterFetch__func',
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
    category: 'control',
    name: 'checkable',
    label: '多选',
  },
];
