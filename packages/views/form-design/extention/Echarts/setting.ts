//import { chartOptions } from './tpl/loader';

export default [
  {
    component: 'CodeInput',
    label: '数据获取',
    field: 'chartVar__func',
    componentProps: {
      buttonText: '编辑',
      mode: 'application/json',
      editorTitle: '代码编辑',
      bordered: true,
      autoFormat: true,
      readonly: false,
      prefix: 'function(){',
      suffix: '}',
    },
  },
];
