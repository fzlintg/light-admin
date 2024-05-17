import { optionsListApi } from '@/api/demo/select';

export default {
  label: 'API选择',
  required: true,
  icon: 'wpf:password1',
  field: '',
  componentProps: {
    api: optionsListApi,
    api__func: `return await axios.get({url:"/select/getDemoOptions"});
    `,
    api__params: ['params'],
    onChange__func: '',
    onChange__params: ['e'],
    params__var: `{
      id: 1,
    }`,
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
  defaultValue: null,
};
