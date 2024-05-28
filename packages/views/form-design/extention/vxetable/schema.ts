import { merge } from 'lodash-es';
import gridOptions, { schema } from './tpl/default';

export const mergeSchema = (gridOptions, schema) => {
  const result = {
    label: 'vxe表格',
    field: '',
    type: 'showItem',
    formItem: false,
    icon: 'ant-design:border-bottom-outlined',
    componentProps: {
      height: 600,
      gridVar__func: '',
      tpl: 'default',
      gridOptions,
    },
    children: [],
    options: {
      gutter: 0,
    },
  };
  return merge(result, schema);
};
const options = mergeSchema(gridOptions, schema);

export default options;
