export default {
  label: '工具栏',
  type: 'showItem_action',
  icon: 'ant-design:bell-outlined',
  componentProps: {},
  itemProps: {
    labelCol: {},
    wrapperCol: {},
    hiddenLabel: true,
  },

  width: ' ',
  children: [
    {
      title: '测试',
      icon: 'ant-design:send-outlined',
      click__func: `alert("ok")`,
    },
  ],
};
