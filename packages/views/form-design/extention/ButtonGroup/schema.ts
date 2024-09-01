export default {
  label: '按钮组',
  type: 'showItem',
  icon: 'ant-design:bell-outlined',
  componentProps: {},
  children: [
    {
      buttonText: '按钮1',
      type: 'link',
      onClick__func: 'alert("OK")',
      disabled: false,
      danger: false,
      onClick__params: ['{_this,callback,utils}'],
    },
    {
      buttonText: '按钮2',
      type: 'link',
      disabled: false,
      danger: false,
      onClick__func: '',
      onClick__params: ['{_this,callback,utils}'],
    },
  ],
};
