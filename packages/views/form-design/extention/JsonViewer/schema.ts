export default {
  label: 'JSON展示',
  type: 'showItem',
  icon: 'ant-design:bell-outlined',
  componentProps: {
    defaultValue: { demo: 1 },
    theme: 'light',
    sort: true,
    boxed: true,
    copyable: true,
    expandDepth: 3,
    expanded: false,
    onKeyClick__func: ``,
    timeformat__func: `time => time.toLocaleString()`,
    showArrayIndex: true,
    showDoubleQuotes: false,
  },
};
