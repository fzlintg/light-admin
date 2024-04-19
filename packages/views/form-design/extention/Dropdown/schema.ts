export default {
  label: '下拉',
  type: 'showItem',
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
};
