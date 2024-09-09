export const name = '输入组件';
export const schema = [
  {
    component: 'InputCountDown',
    label: '倒计输入',
    icon: 'line-md:iconify2',
    colProps: { span: 24 },
    field: '',
    componentProps: {},
  },
  {
    component: 'InputNumber',
    label: '数字输入',
    icon: 'ant-design:field-number-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: { style: 'width:200px', defaultValue: 0 },
  },
  {
    component: 'InputTextArea',
    label: '文本域',
    icon: 'ant-design:file-text-filled',
    field: '',
    colProps: { span: 24 },
    componentProps: { defaultValue: '', autoSize: { minRows: 2 } },
  },
];
