export default {
  schemas: [
    {
      component: 'Tabs',
      label: '标签页',
      type: 'gridContainer',
      componentProps: {
        onChange__func: `    `,
        onChange__params: ['key'],
      },
      columns: [
        {
          label: '标签1',
          children: [
            {
              component: 'Echarts',
              label: 'echart图表',
              type: 'showItem',
              componentProps: {
                tpl: 'areaStack',
                chartTpl: {
                  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                  title: {
                    text: 'Gradient Stacked Area Chart',
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'cross',
                      label: {
                        backgroundColor: '#6a7985',
                      },
                    },
                  },
                  legend: {
                    data__var: ` legnendData `,
                  },
                  toolbox: {
                    feature: {
                      saveAsImage: {},
                    },
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                  },
                  xAxis: [
                    {
                      type: 'category',
                      boundaryGap: false,
                      data__var: ` xData `,
                    },
                  ],
                  yAxis: [
                    {
                      type: 'value',
                    },
                  ],
                  series: [
                    {
                      name: 'Line 1',
                      type: 'line',
                      stack: 'Total',
                      smooth: true,
                      lineStyle: {
                        width: 0,
                      },
                      showSymbol: false,
                      areaStyle: {
                        opacity: 0.8,
                        color__var: `  new echarts.graphic.LinearGradient(0, 0, 0, 1, [ 
           { 
             offset: 0, 
             color: 'rgb(128, 255, 165)' 
           }, 
           { 
             offset: 1, 
             color: 'rgb(1, 191, 236)' 
           } 
         ]) `,
                      },
                      emphasis: {
                        focus: 'series',
                      },
                      data__var: ` data[0] `,
                    },
                    {
                      name: 'Line 2',
                      type: 'line',
                      stack: 'Total',
                      smooth: true,
                      lineStyle: {
                        width: 0,
                      },
                      showSymbol: false,
                      areaStyle: {
                        opacity: 0.8,
                        color__var: ` new echarts.graphic.LinearGradient(0, 0, 0, 1, [ 
           { 
             offset: 0, 
             color: 'rgb(0, 221, 255)', 
           }, 
           { 
             offset: 1, 
             color: 'rgb(77, 119, 255)', 
           }, 
         ]) `,
                      },
                      emphasis: {
                        focus: 'series',
                      },
                      data__var: ` data[1] `,
                    },
                    {
                      name: 'Line 3',
                      type: 'line',
                      stack: 'Total',
                      smooth: true,
                      lineStyle: {
                        width: 0,
                      },
                      showSymbol: false,
                      areaStyle: {
                        opacity: 0.8,
                        color__var: ` new echarts.graphic.LinearGradient(0, 0, 0, 1, [ 
           { 
             offset: 0, 
             color: 'rgb(55, 162, 255)', 
           }, 
           { 
             offset: 1, 
             color: 'rgb(116, 21, 219)', 
           }, 
         ]) `,
                      },
                      emphasis: {
                        focus: 'series',
                      },
                      data__var: ` data[2] `,
                    },
                    {
                      name: 'Line 4',
                      type: 'line',
                      stack: 'Total',
                      smooth: true,
                      lineStyle: {
                        width: 0,
                      },
                      showSymbol: false,
                      areaStyle: {
                        opacity: 0.8,
                        color__var: ` new echarts.graphic.LinearGradient(0, 0, 0, 1, [ 
           { 
             offset: 0, 
             color: 'rgb(255, 0, 135)', 
           }, 
           { 
             offset: 1, 
             color: 'rgb(135, 0, 157)', 
           }, 
         ]) `,
                      },
                      emphasis: {
                        focus: 'series',
                      },
                      data__var: ` data[3] `,
                    },
                    {
                      name: 'Line 5',
                      type: 'line',
                      stack: 'Total',
                      smooth: true,
                      lineStyle: {
                        width: 0,
                      },
                      showSymbol: false,
                      label: {
                        show: true,
                        position: 'top',
                      },
                      areaStyle: {
                        opacity: 0.8,
                        color__var: ` new echarts.graphic.LinearGradient(0, 0, 0, 1, [ 
           { 
             offset: 0, 
             color: 'rgb(255, 191, 0)', 
           }, 
           { 
             offset: 1, 
             color: 'rgb(224, 62, 76)', 
           }, 
         ]) `,
                      },
                      emphasis: {
                        focus: 'series',
                      },
                      data__var: ` data[4] `,
                    },
                  ],
                },
                chartVar__func: ` const legnendData= ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']; 
     return {legnendData,xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
 data:[[140, 232, 101, 264, 90, 340, 250],[120, 282, 111, 234, 220, 340, 310] 
 ,[320, 132, 201, 334, 190, 130, 220], [220, 402, 231, 134, 190, 230, 120],[220, 302, 181, 234, 210, 290, 150]] 
     } `,
                height: '50vh',
                width: '100%',
              },
              _type: 'custom',
              width: '200px',
              colProps: {
                span: 24,
              },
              field: 'echarts_4',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
          ],
        },
        {
          label: '标签2',
          children: [
            {
              component: 'Echarts',
              label: 'echart图表',
              type: 'showItem',
              componentProps: {
                tpl: 'simpleBar',
                chartTpl: {
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      lineStyle: {
                        width: 1,
                        color: '#019680',
                      },
                    },
                  },
                  grid: {
                    left: '1%',
                    right: '1%',
                    top: '2  %',
                    bottom: 0,
                    containLabel: true,
                  },
                  xAxis: {
                    type: 'category',
                    data__var: ` [...new Array(12)].map((_item, index) =>  \` $\{index + 1}月 \` ) `,
                  },
                  yAxis: {
                    type: 'value',
                    max: 8000,
                    splitNumber: 4,
                  },
                  series: [
                    {
                      data__var: ` data `,
                      type: 'bar',
                      barMaxWidth: 80,
                    },
                  ],
                },
                chartVar__func: ` const data=[3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800] 
 return {data} `,
                height: '50vh',
                width: '100%',
              },
              _type: 'custom',
              width: '200px',
              colProps: {
                span: 24,
              },
              field: 'echarts_5',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
          ],
        },
      ],
      colProps: {
        span: 24,
      },
      _type: 'custom',
      width: '200px',
      field: 'tabs_1',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Echarts',
      label: 'echart图表',
      type: 'showItem',
      componentProps: {
        tpl: 'basicRadar',
        chartTpl: {
          legend: {
            bottom: 0,
            data__var: ` legendData `,
          },
          tooltip: {},
          radar: {
            radius: '60%',
            splitNumber: 8,
            indicator__var: ` indicatorData `,
          },
          series: [
            {
              type: 'radar',
              symbolSize: 0,
              areaStyle: {
                shadowBlur: 0,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1,
              },
              data__var: ` data `,
            },
          ],
        },
        chartVar__func: ` return {legendData: ['访问', '购买'], 
       indicatorData:[ 
         { 
           name: '电脑', 
         }, 
         { 
           name: '充电器', 
         }, 
         { 
           name: '耳机', 
         }, 
         { 
           name: '手机', 
         }, 
         { 
           name: 'Ipad', 
         }, 
         { 
           name: '耳机', 
         }, 
       ],data:[ 
         { 
           value: [90, 50, 86, 40, 50, 20], 
           name: '访问', 
           itemStyle: { 
             color: '#b6a2de', 
           }, 
         }, 
         { 
           value: [70, 75, 70, 76, 20, 85], 
           name: '购买', 
           itemStyle: { 
             color: '#5ab1ef', 
           }, 
         }, 
       ] 
     } 
      `,
        height: '50vh',
        width: '100%',
      },
      _type: 'custom',
      width: '200px',
      colProps: {
        span: 8,
      },
      field: 'echarts_3',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Echarts',
      label: 'echart图表',
      type: 'showItem',
      componentProps: {
        tpl: 'doughnut',
        chartTpl: {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '1%',
            left: 'center',
          },
          series: [
            {
              color__var: ` colorData `,
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
              data__var: ` data `,
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
            },
          ],
        },
        chartVar__func: ` return { 
       colorData:['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'], 
       data:[ 
         { value: 1048, name: '搜索引擎' }, 
         { value: 735, name: '直接访问' }, 
         { value: 580, name: '邮件营销' }, 
         { value: 484, name: '联盟广告' }, 
       ] 
     } 
      `,
        height: '50vh',
        width: '100%',
      },
      _type: 'custom',
      width: '200px',
      colProps: {
        span: 8,
      },
      field: 'echarts_1',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Echarts',
      label: 'echart图表',
      type: 'showItem',
      componentProps: {
        tpl: 'nightingale',
        chartTpl: {
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '成交占比',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              color__var: ` color `,
              data__var: ` data `,
              roseType: 'radius',
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
            },
          ],
        },
        chartVar__func: ` return {data:[ 
       { value: 500, name: '电子产品' }, 
       { value: 310, name: '服装' }, 
       { value: 274, name: '化妆品' }, 
       { value: 400, name: '家居' }, 
     ].sort(function (a, b) { 
       return a.value - b.value; 
     }), 
   color:['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'] 
   } `,
        height: '50vh',
        width: '100%',
      },
      _type: 'custom',
      width: '200px',
      colProps: {
        span: 8,
      },
      field: 'echarts_2',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
  ],
  layout: 'horizontal',
  labelLayout: 'flex',
  labelWidth: 100,
  labelCol: {},
  wrapperCol: {},
};
