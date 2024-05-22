export default {
  label: 'API穿梭框',
  icon: 'bx:bx-transfer-alt',
  component: 'ApiTransfer',
  componentProps: {
    render__func: 'return item.label',
    render__params: ['item'],
    api__func: `return await axios.get({url:"/select/transfer"})`,
    api__params: ['params'],
  },
  defaultValue: ['1'],
  required: true,
};
