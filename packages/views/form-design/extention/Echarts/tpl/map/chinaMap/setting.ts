export default {
  schemas: [
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
  layout: 'horizontal',
  labelLayout: 'flex',
  labelWidth: 100,
  labelCol: {},
  wrapperCol: {},
};
