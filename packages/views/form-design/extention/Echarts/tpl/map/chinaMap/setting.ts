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
        onOkButtonClick__func: ` this.$emit('update:formModel',this.getModal().getFormModel());     
             return true; `,
        onCancelButtonClick__func: `  `,
        onDialogOpened__func: `  `,
        onDialogBeforeClose__func: `  `,
      },
      children: [
        {
          component: 'ColorPicker',
          label: '浅色',
          componentProps: {
            defaultValue: 'rgb(255, 167, 39)',
          },
          _type: 'custom',
          width: '200px',
          colProps: {
            span: 24,
          },
          field: 'visualMap[0].inRange.color[0]',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'ColorPicker',
          label: '深色',
          componentProps: {
            defaultValue: 'rgb(255, 167, 39)',
          },
          _type: 'custom',
          width: '200px',
          colProps: {
            span: 24,
          },
          field: 'visualMap[0].inRange.color[1]',
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
