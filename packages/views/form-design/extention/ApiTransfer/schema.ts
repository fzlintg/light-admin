const guangdong = [
  {
    label: '珠海市',
    value: '1',
    key: '1',
  },
  {
    label: '深圳市',
    value: '2',
    key: '2',
  },
  {
    label: '广州市',
    value: '3',
    key: '3',
  },
];
export default {
  label: 'API穿梭框',
  icon: 'bx:bx-transfer-alt',
  component: 'ApiTransfer',
  componentProps: {
    render: (item) => item.label,
    render__func: '',
    render__params: ['item'],
    api: async () => {
      return Promise.resolve(guangdong);
    },
    api__func: '',
    api__params: ['params'],
  },
  defaultValue: ['1'],
  required: true,
};
