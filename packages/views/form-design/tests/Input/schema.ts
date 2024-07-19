export default {
  component: 'Input',
  label: '输入框',
  icon: 'bi:input-cursor-text',
  field: '',
  colProps: { span: 24 },
  componentProps: {
    type: 'text',
    defaultValue: '',
    onChange__func: '',
    readonly: false,
  },
};
