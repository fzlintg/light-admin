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
      defaultValue: '',
    },
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
  {
    field: 'color',
    label: '颜色',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        {
          label: '默认',
          value: 'default',
        },
        {
          label: 'primary',
          value: 'primary',
        },
        {
          label: 'success',
          value: 'success',
        },
        {
          label: 'warning',
          value: 'warning',
        },
        {
          label: 'error',
          value: 'error',
        },
      ],
    },
  },
  {
    field: 'preIcon',
    label: '前图标',
    component: 'IconPicker',
    componentProps: {
      placeholder: '请选择图标',
    },
  },
  {
    field: 'postIcon',
    label: '后图标',
    component: 'IconPicker',
    componentProps: {
      placeholder: '请选择图标',
    },
  },
  {
    field: 'iconSize',
    label: '图标大小',
    component: 'InputNumber',
    componentProps: { defaultValue: 14 },
  },
];
