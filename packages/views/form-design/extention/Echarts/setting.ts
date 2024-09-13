export default [
  {
    component: 'CodeInput',
    label: '数据获取',
    field: 'chartVar__func',
    componentProps: {
      buttonText: '编辑',
      mode: 'json',
      editorTitle: '代码编辑(返回的数据对象，可以直接使用在模版上)',
      bordered: true,
      autoFormat: true,
      readonly: false,
      prefix: 'async function({axios}){',
      suffix: '}',
    },
  },
  {
    field: 'refresh',
    label: '自动刷新',
    category: 'control',
  },
  {
    field: 'refresh_seconds',
    label: '刷新间隔(秒)',
    component: 'InputNumber',
  },
];
