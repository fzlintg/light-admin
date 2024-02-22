import { optionsListApi } from '@/api/demo/select';

export default {
  label: '远程下拉',
  required: true,
  icon: 'wpf:password1',
  field: '',
  componentProps: {
    api: optionsListApi,
    apiFunc: '',
    params: {
      id: 1,
    },
    resultField: 'list',
    // use name as label
    labelField: 'name',
    // use id as value
    valueField: 'id',
    // not request untill to select
    immediate: true,
    onChange: (e, v) => {
      console.log('ApiSelect====>:', e, v);
    },
    // atfer request callback
    onOptionsChange: (options) => {
      console.log('get options', options.length, options);
    },
  },
  colProps: {
    span: 8,
  },
  defaultValue: '0',
};
