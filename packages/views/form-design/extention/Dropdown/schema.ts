export default {
  label: '下拉',
  type: 'showItem_action',
  icon: 'ant-design:bell-outlined',
  componentProps: {
    title: '下拉菜单',
  },
  children: [
    {
      label: '测试1',
      onClick__func: `alert("ok")`,
    },
  ],
  itemProps: {
    labelCol: {},
    wrapperCol: {},
    hiddenLabel: true,
  },
};
