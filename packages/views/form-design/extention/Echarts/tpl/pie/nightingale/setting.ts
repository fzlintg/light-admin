export default {
  schemas: [
    {
      component: 'Input',
      label: '名称',
      field: 'series[0].name',
      colProps: {
        span: 24,
      },
      componentProps: {
        type: 'text',
        defaultValue: '',
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Input',
      label: '颜色变量',
      field: 'series[0].color__var',
      colProps: {
        span: 24,
      },
      componentProps: {
        type: 'text',
        defaultValue: '',
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Input',
      label: '数据变量',
      field: 'series[0].data__var',
      colProps: {
        span: 24,
      },
      componentProps: {
        type: 'text',
        defaultValue: '',
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'CodeInput',
      label: '动画延时',
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
      defaultValue: '',
      _type: 'custom',
      width: '200px',
      colProps: {
        span: 24,
      },
      field: 'series[0].animationDelay__func',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
  ],
  layout: 'horizontal',
  labelLayout: 'flex',
  labelWidth: 100,
  labelCol: {},
  wrapperCol: {},
};
