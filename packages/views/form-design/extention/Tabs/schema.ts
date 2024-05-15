export default {
  label: '标签页',
  type: 'gridContainer',
  icon: 'gravity-ui:layout-tabs',
  componentProps: {
    onChange__func: `  `,
    onChange__params: ['key'],
  },
  columns: [
    {
      label: '标签1',
      children: [],
    },
    {
      label: '标签2',
      children: [],
    },
  ],
  colProps: { span: 24 },
};
