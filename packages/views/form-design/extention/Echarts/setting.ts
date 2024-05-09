import { chartOptions } from './tpl/loader';

export default [
  {
    component: 'Select',
    label: '组件选择',
    field: 'tpl',
    componentProps: {
      options: chartOptions,
    },
  },
];
