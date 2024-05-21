//import { optionsListApi } from '@/api/demo/select';

export default {
  label: 'API选择',
  required: true,
  icon: 'wpf:password1',
  field: '',
  componentProps: {
    // api: optionsListApi,
    api__func: `return await axios.get({url:"/select/getDemoOptions?keyword="+params.id});
    `,
    api__params: ['params'],
    onChange__func: '',
    onChange__params: ['e'],
    defaultContext__var: `{
      apiselect_1: '1',
}`,
    params__tpl: `{
      id: $\{apiselect_1},
}`,
    resultField: 'list',
    // use name as label
    labelField: 'name',
    // use id as value
    valueField: 'id',
    // not request untill to select
    immediate: true,
    _update__func: `await this.getItemRef().fetch(this.formatTpl('params'))`,
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
