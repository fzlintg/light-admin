export default {
  schemas: [
    {
      component: 'EditText',
      label: '编辑标签',
      formItem: true,
      componentProps: {
        defaultValue: '标签',
        width: '300px',
      },
      itemProps: {
        hiddenLabel: true,
        labelCol: {},
        wrapperCol: {},
      },
      children: [],
      _type: 'custom',
      width: '200px',
      colProps: {
        span: 24,
      },
      field: 'edittext_1',
    },
  ],
  layout: 'horizontal',
  labelLayout: 'flex',
  labelWidth: 100,
  labelCol: {},
  wrapperCol: {},
};
