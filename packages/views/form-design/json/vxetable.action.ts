export default {
  schemas: [
    {
      component: 'Button',
      formItem: false,
      type: 'showItem',
      label: '表格工具栏编辑',
      field: 'button_1',
      colProps: {
        span: 24,
      },
      hiddenLabel: true,
      componentProps: {
        value: 'primary',
        type: 'primary',
        size: 'default',
        onClick__func: ` let formData=this.getFormData() 
         this.getModal("modal").show(formData) `,
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
        title: '表格工具栏编辑',
        width: 1000,
        slots: {},
        onOkButtonClick__func: ` let modal=this.getModal('modal'); 
 let formData=modal.getFormModel(); 
 let props=this.getFormData(); 
 Object.assign(props,formData);
 return true; `,
        onCancelButtonClick__func: `  `,
        onDialogOpened__func: `  `,
        onDialogBeforeClose__func: `  `,
        style: '',
      },
      children: [
        {
          component: 'GridSubForm',
          label: '多行表单',
          field: 'actions',
          type: 'containerItem',
          formItem: true,
          componentProps: {
            onRowDelete__params: ['{idx,data,row}'],
            onRowInsert__params: ['{idx,data,row}'],
            onRowAdd__params: ['{idx,data,row}'],
            onRowChange__params: ['data'],
            style: '',
            onRowDelete__func: `  `,
            onRowInsert__func: `  `,
            onRowAdd__func: `  `,
            onRowChange__func: `  `,
          },
          columns: [
            {
              span: '24',
              children: [
                {
                  component: 'Input',
                  label: '按钮名称',
                  icon: 'bi:input-cursor-text',
                  field: 'label',
                  colProps: {
                    span: 24,
                  },
                  componentProps: {
                    type: 'text',
                    placeholder: '',
                    style: '',
                    defaultValue: '',
                    prefix: '',
                    suffix: '',
                    addonBefore: '',
                    addonAfter: '',
                    maxLength: 100,
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
                  component: 'RadioButtonGroup',
                  label: '颜色',
                  icon: 'carbon:radio-button-checked',
                  field: 'color',
                  colProps: {
                    span: 24,
                  },
                  componentProps: {
                    options: [
                      {
                        label: '错误',
                        value: 'error',
                      },
                      {
                        label: '成功',
                        value: 'success',
                      },
                    ],
                    style: '',
                  },
                  defaultValue: '',
                  _type: 'custom',
                  width: '200px',
                  key: 'radiobuttongroup_6',
                  itemProps: {
                    labelCol: {},
                    wrapperCol: {},
                  },
                },
                {
                  component: 'CodeInput',
                  label: '事件函数',
                  icon: 'ant-design:credit-card-outlined',
                  componentProps: {
                    buttonText: '编辑',
                    mode: 'application/json',
                    editorTitle: '代码编辑',
                    bordered: true,
                    autoFormat: true,
                    readonly: false,
                    style: '',
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
            },
          ],
          colProps: {
            span: 24,
          },
          options: {
            gutter: 0,
          },
          _type: 'custom',
          width: '200px',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
          key: 'gridsubform_10',
        },
      ],
      _type: 'custom',
      width: '200px',
      colProps: {
        span: 24,
      },
      field: 'modal_2',
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
