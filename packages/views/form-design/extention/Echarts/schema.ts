export default {
  label: 'echart图表',
  type: 'showItem',
  icon: 'ant-design:bar-chart-outlined',
  componentProps: {
    tpl: 'lineBar',
    chartTpl: '',
    chartVar__func: `let data = await axios.get({url:"/echart/getLineData"});
return data;`,
    height: '50vh',
    width: '100%',
  },
};
