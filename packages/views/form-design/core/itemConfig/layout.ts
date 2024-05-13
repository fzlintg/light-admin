export const name = '布局控件';
export const schema = [
  {
    field: '',
    component: 'Grid',
    type: 'container',
    label: '栅格布局',
    icon: 'ant-design:border-bottom-outlined',
    componentProps: {},
    columns: [
      {
        span: 12,
        children: [],
      },
      {
        span: 12,
        children: [],
      },
    ],
    colProps: { span: 24 },
    options: {
      gutter: 0,
    },
  },
];
