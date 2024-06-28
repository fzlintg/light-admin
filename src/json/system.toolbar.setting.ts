export default {
  schemas: [
    {
      component: 'Drawer',
      label: '抽屉',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '抽屉',
        slots: {},
        placement: 'right',
        onOkButtonClick__func: `window.localStorage.setItem("light_form_mode",JSON.stringify(this.getFormModel())); 
        debugger;
        return true;
  `,
        onOkButtonClick__params: ['params'],
        onCancelButtonClick__func: `    `,
        onCancelButtonClick__params: ['params'],
        onDialogOpened__func: `    `,
        onDialogOpened__params: ['params'],
        onDialogBeforeClose__func: `    `,
        onDialogBeforeClose__params: ['params'],
        width: 378,
        zIndex: 1000,
        showOkBtn: true,
        showCancelBtn: true,
        showFooter: true,
      },
      children: [
        {
          component: 'Switch',
          label: '模式开关',
          colProps: {
            span: 24,
          },
          componentProps: {
            checkedChildren: '服务',
            checkedValue: 'true',
            unCheckedChildren: '本地',
            unCheckedValue: 'false',
          },
          defaultValue: false,
          width: '200px',
          field: 'mode',
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
      field: 'drawer',
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
