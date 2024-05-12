export const name = '蓝色折线柱';
export const schema = {
  componentProps: {
    chartVar__func: `let data = await axios.get({url:"/echart/getLineData"});
  return data;`,
  },
};
export default {
  backgroundColor: '#0f375f',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      label: {
        show: true,
        backgroundColor: '#333',
      },
    },
  },
  legend: {
    data: ['line', 'bar'],
    textStyle: {
      color: '#ccc',
    },
  },
  xAxis: {
    // data: category,
    data__var: `category`,
    axisLine: {
      lineStyle: {
        color: '#ccc',
      },
    },
  },
  yAxis: {
    splitLine: { show: false },
    axisLine: {
      lineStyle: {
        color: '#ccc',
      },
    },
  },
  series: [
    {
      name: 'line',
      type: 'line',
      smooth: true,
      showAllSymbol: 'auto',
      symbol: 'emptyCircle',
      symbolSize: 15,
      //data: lineData,
      data__var: `lineData`,
    },
    {
      name: 'bar',
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        borderRadius: 5,
        color__func: `return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#14c8d4' },
          { offset: 1, color: '#43eec6' },
        ])`,
      },
      //data: barData,
      data__var: `barData`,
    },
    {
      name: 'line',
      type: 'bar',
      barGap: '-100%',
      barWidth: 10,
      itemStyle: {
        color__func: `return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(20,200,212,0.5)' },
          { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
          { offset: 1, color: 'rgba(20,200,212,0)' },
        ])`,
      },
      z: -12,
      data__var: `lineData`,
    },
    {
      name: 'dotted',
      type: 'pictorialBar',
      symbol: 'rect',
      itemStyle: {
        color: '#0f375f',
      },
      symbolRepeat: true,
      symbolSize: [12, 4],
      symbolMargin: 1,
      z: -10,
      data__var: `lineData`,
    },
  ],
};
