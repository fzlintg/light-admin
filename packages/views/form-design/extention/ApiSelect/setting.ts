import { subscribe } from './../../../../hooks/src/useRequest/utils/cacheSubscribe';
import { MODE } from '@c/CodeEditor';
//import { optionsListApi } from '@/api/demo/select';

export default [
  {
    field: 'labelField',
    label: '标签字段',
    component: 'Input',
  },
  {
    field: 'valueField',
    label: 'value字段',
    component: 'Input',
  },
  {
    field: 'resultField',
    label: 'result字段',
    component: 'Input',
  },
  {
    field: 'params__tpl',
    label: '参数模版',
    component: 'InputTextArea',
    componentProps: {
      autoSize: { minRows: 2 },
    },
  },
  {
    field: 'defaultContext__var',
    label: '默认值',
    component: 'InputTextArea',
    componentProps: {
      autoSize: { minRows: 2 },
    },
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
      prefix: 'function({context: {axios}){',
      surfix: '}',
    },
  },
];
