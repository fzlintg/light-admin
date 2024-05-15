export const name = '环形图';
export const schema = {
  componentProps: {
    chartVar__func: `return {
      colorData:['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
      data:[
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
      ]
    }
    `,
  },
};
export default {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '1%',
    left: 'center',
  },
  series: [
    {
      color__var: `colorData`,
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data__var: `data`,
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay: function () {
        return Math.random() * 100;
      },
    },
  ],
};
