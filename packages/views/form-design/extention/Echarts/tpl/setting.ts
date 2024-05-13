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
        onOkButtonClick__func: `debugger;this.$emit('update:formModel',this.getModal().getFormModel());    
        return true;     `,
        onCancelButtonClick__func: `  `,
        onDialogOpened__func: `  `,
        onDialogBeforeClose__func: `  `,
      },
      children: [
        {
          component: 'Tabs',
          label: '标签页',
          type: 'container',
          componentProps: {},
          columns: [
            {
              label: '模版配置',
              children: [],
            },
            {
              label: '模版查看',
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
                    onKeyClick__func: `  `,
                  },
                  _type: 'custom',
                  width: '200px',
                  colProps: {
                    span: 24,
                  },
                  field: 'jsonviewer',
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
          width: '200px',
          field: 'tabs_1',
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
