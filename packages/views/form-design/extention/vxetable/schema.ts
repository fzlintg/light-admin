import gridOptions, { actions } from './tpl/default';

export default {
  label: 'vxe表格',
  field: '',
  type: 'showItem',
  formItem: false,
  icon: 'ant-design:border-bottom-outlined',
  componentProps: {
    height: 600,
    api: {
      columns: '/table/getVxeColumn',
    },
    tpl: 'default',
    chartVar__func: ``,
    actions,
    gridOptions,
  },
  children: [],
  options: {
    gutter: 0,
  },
};
