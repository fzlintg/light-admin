export default {
  label: '输入框',
  icon: 'bi:input-cursor-text',
  field: '',
  colProps: { span: 24 },
  componentProps: {
    type: 'text',
    defaultValue: '',
    change__func: '',
    change__params: ['value'],
    readonly: false,
  },
};
