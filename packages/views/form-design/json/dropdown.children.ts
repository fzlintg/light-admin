export default {
  schemas: [
    {
      component: 'Button',
      formItem: false,
      type: 'showItem',
      label: '菜单编辑',
      field: 'button_4',
      colProps: {
        span: 24,
      },
      hiddenLabel: true,
      componentProps: {
        value: 'primary',
        type: 'primary',
        size: 'default',
        onClick__func: `let formData=this.getFormData() 
        this.getItemRef('modal').show(formData)`,
        style: '',
        shape: '',
        color: '',
        iconSize: 14,
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '对话框',
        width: 1000,
        slots: {},
        onOkButtonClick__func: ``,
        onCancelButtonClick__func: `  `,
        onDialogOpened__func: `  `,
        onDialogBeforeClose__func: `  `,
      },
      children: [
        {
          component: 'SubForm',
          label: '单行表单',
          field: 'children',
          type: 'containerItem',
          formItem: true,
          componentProps: {
            onRowDelete__params: ['{idx,data,row}'],
            onRowInsert__params: ['{idx,data,row}'],
            onRowAdd__params: ['{idx,data,row}'],
            onRowChange__params: ['data'],
          },
          children: [
            {
              component: 'Input',
              label: '菜单名称',
              icon: 'bi:input-cursor-text',
              field: 'label',
              colProps: {
                span: 24,
              },
              componentProps: {
                type: 'text',
              },
              defaultValue: '',
              width: '200px',
              key: 'input_2',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'CodeInput',
              label: '点击事件',
              icon: 'ant-design:credit-card-outlined',
              componentProps: {
                buttonText: '编辑',
                mode: 'application/json',
                editorTitle: '代码编辑',
                bordered: true,
                autoFormat: true,
                readonly: false,
              },
              defaultValue: '',
              _type: 'custom',
              width: '200px',
              colProps: {
                span: 24,
              },
              key: 'codeinput_3',
              field: 'onClick__func',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
          ],
          options: {
            gutter: 0,
          },
          _type: 'custom',
          width: '200px',
          colProps: {
            span: 24,
          },
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
