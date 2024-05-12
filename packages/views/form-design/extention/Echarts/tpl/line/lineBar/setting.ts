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
        onOkButtonClick__func: `this.$emit('update:formModel',this.getModal().getFormModel());    
            return true;    `,
        onCancelButtonClick__func: `          `,
        onDialogOpened__func: `         `,
        onDialogBeforeClose__func: `          `,
      },
      children: [
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
            span: 12,
          },
          field: 'series[1].itemStyle.color__func',
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
            span: 12,
          },
          field: 'series[2].itemStyle.color__func',
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
