export default {
  schemas: [
    {
      component: 'ColorPicker',
      label: '颜色',
      componentProps: {
        defaultValue: '#1f87e8',
      },
      _type: 'custom',
      width: '200px',
      colProps: {
        span: 24,
      },
      field: 'series[0].itemStyle.color',
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
