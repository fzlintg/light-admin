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
        onOkButtonClick__func: `  this.$emit('update:formModel',this.getModal().getFormModel());     
             return true;  `,
        onCancelButtonClick__func: `    `,
        onDialogOpened__func: `    `,
        onDialogBeforeClose__func: `    `,
      },
      children: [
        {
          component: 'Input',
          label: '饼图1名称',
          field: 'title[0].text',
          colProps: {
            span: 24,
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
          label: '饼图1数据',
          field: 'series[0].data__var',
          colProps: {
            span: 24,
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
          label: '饼图2名称',
          field: 'title[2].text',
          colProps: {
            span: 24,
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
          label: '饼图2数据',
          field: 'series[2].data__var',
          colProps: {
            span: 24,
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
          label: '柱图名称',
          field: 'title[1].text',
          colProps: {
            span: 24,
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
          label: '柱图数据',
          field: 'series[1].data__var',
          colProps: {
            span: 24,
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
          component: 'Divider',
          label: '数据',
          colProps: {
            span: 24,
          },
          field: 'divider_1',
          componentProps: {
            orientation: 'center',
            dashed: true,
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
