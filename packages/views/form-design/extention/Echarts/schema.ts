// import { chartMap } from './tpl/loader';
// import { cloneDeep } from 'lodash-es';
// import { TransObjectToCode } from '../../utils/index';

// const chartOptions = cloneDeep(chartMap['lineBar']);
// const chartTpl = TransObjectToCode(chartOptions, true);

export default {
  label: 'echart图表',
  type: 'showItem',
  icon: 'ant-design:bar-chart-outlined',
  componentProps: {
    tpl: 'lineBar',
    chartTpl: ``,
    chartVar__func: ``,
    height: '50vh',
    width: '100%',
  },
};
