export default {
  schemas: [
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '对话框',
        width: 1000,
        slots: {},
        onOkButtonClick__func: `debugger;`,
        onCancelButtonClick__func: ` debugger; `,
        onDialogOpened__func: ` `,
        onDialogBeforeClose__func: `  `,
      },
      children: [
        {
          component: 'CodeInput',
          label: '折线数据',
          icon: 'ant-design:credit-card-outlined',
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
          key: 'codeinput_1',
          field: 'series[0].data__func',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'CodeInput',
          label: '柱图数据',
          icon: 'ant-design:credit-card-outlined',
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
          key: 'codeinput_3',
          field: 'series[1].data__func',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'CodeInput',
          label: '柱图颜色',
          icon: 'ant-design:credit-card-outlined',
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
          key: 'codeinput_2',
          field: 'series[1].itemStyle.color__func',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
      ],
      _type: 'custom',
      width: '200px',
      colProps: {
        span: 24,
      },
      field: 'modal',
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
