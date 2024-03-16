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
  {
    component: 'Tabs',
    label: '标签页',
    type: 'container',
    icon: 'gravity-ui:layout-tabs',
    componentProps: {},
    columns: [
      {
        label: '标签1',
        children: [],
      },
      {
        label: '标签2',
        children: [],
      },
    ],
    colProps: { span: 24 },
  },
];
