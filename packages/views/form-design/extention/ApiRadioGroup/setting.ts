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
];
