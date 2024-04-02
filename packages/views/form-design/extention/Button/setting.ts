import { MODE } from '@c/CodeEditor';

export default [
  {
    component: 'CodeInput',
    label: 'onClick函数',
    field: 'onClick__func',

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
  {
    label: '危险',
    field: 'danger',
    category: 'control',
  },
  {
    label: '外形',
    field: 'shape',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        {
          label: '圆角',
          value: 'round',
        },
        {
          label: '圆形',
          value: 'circle',
        },
        {
          label: '默认',
          value: 'default',
        },
      ],
    },
  },
];
