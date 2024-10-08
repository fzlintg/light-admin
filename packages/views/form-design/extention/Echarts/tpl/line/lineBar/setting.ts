export default {
  schemas: [
    {
      component: 'Input',
      label: '1.折线数据',
      field: 'series[0].data__var',
      colProps: {
        span: 12,
      },
      componentProps: {
        type: 'text',
        defaultValue: '',
        ds: '',
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Input',
      label: '2.柱图数据',
      field: 'series[1].data__var',
      colProps: {
        span: 12,
      },
      componentProps: {
        type: 'text',
        defaultValue: '',
        ds: '',
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'CodeInput',
      label: '2.柱图颜色',
      componentProps: {
        buttonText: '编辑',
        mode: 'json',
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
        span: 12,
      },
      field: 'series[1].itemStyle.color__var',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Input',
      label: '3.柱图数据',
      field: 'series[2].data__var',
      colProps: {
        span: 12,
      },
      componentProps: {
        type: 'text',
        defaultValue: '',
        ds: '',
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'CodeInput',
      label: '3.柱形颜色',
      componentProps: {
        buttonText: '编辑',
        mode: 'json',
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
        span: 12,
      },
      field: 'series[2].itemStyle.color__var',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Input',
      label: '4.虚线数据',
      field: 'series[3].data__var',
      colProps: {
        span: 12,
      },
      componentProps: {
        type: 'text',
        defaultValue: '',
        ds: '',
      },
      width: '200px',
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
