import { registerMap } from 'echarts';

const json = (await (await import('./china.json')).default) as any;
export const name = '中国地图';
registerMap('china', json);
export const schema = {
  componentProps: {
    chartVar__func: `let data = await axios.get({url:"/echart/mapData"});
    return {data};`,
  },
};
export default {
  visualMap: [
    {
      min: 0,
      max: 1000,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: false,
      orient: 'horizontal',
      inRange: {
        color: ['#e0ffff', '#006edd'],
        symbolSize: [30, 100],
      },
    },
  ],
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0, 0, 0, .6)',
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
  },
  series: [
    {
      name: 'iphone4',
      type: 'map',
      map: 'china',
      label: {
        show: true,
        color: 'rgb(249, 249, 249)',
        fontSize: 10,
      },
      itemStyle: {
        areaColor: '#2f82ce',
        borderColor: '#0DAAC1',
      },
      data__var: `data`,
    },
  ],
};
