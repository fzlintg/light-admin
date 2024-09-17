export default {
  type: 'showItem_action',
  label: '按钮',
  icon: 'dashicons:button',
  field: '',
  colProps: { span: 24 },
  hiddenLabel: true,
  componentProps: {
    value: 'primary',
    type: 'primary',
    size: 'default',
    onClick: () => {
      console.log('点击');
    },
    onClick__func: '',
    onClick__params: ['e'],
  },
};
