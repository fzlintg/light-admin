export const baseSetting = {
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
        onOkButtonClick__func: ` this.$emit('update:formModel',this.getModal().getFormModel());     
         return true;      `,
        onCancelButtonClick__func: `    `,
        onDialogOpened__func: `    `,
        onDialogBeforeClose__func: `    `,
      },
      children: [],
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
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '对话框',
        width: 1000,
        slots: {},
        onOkButtonClick__func: `  `,
        onOkButtonClick__params: ['{_this,callback}'],
        onCancelButtonClick__func: `  `,
        onDialogOpened__func: `  `,
        onDialogOpened__params: ['{fData,eData}'],
        onDialogBeforeClose__func: `  `,
        onDialogBeforeClose__params: ['{callback}'],
      },
      children: [
        {
          component: 'JsonViewer',
          label: 'JSON展示',
          type: 'showItem',
          componentProps: {
            defaultValue: {
              demo: 1,
            },
            theme: 'light',
            sort: true,
            boxed: true,
            copyable: true,
            expanded: false,
            expandDepth: 5,
            onKeyClick__func: `  `,
            height: 'auto',
          },
          _type: 'custom',
          width: '200px',
          colProps: {
            span: 24,
          },
          field: 'formData',
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
      field: 'modal_1',
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
