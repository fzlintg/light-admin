//import { optionsListApi } from '@/api/demo/select';

export default {
  label: 'API选择',
  required: true,
  icon: 'wpf:password1',
  field: '',
  componentProps: {
    api__func: `return await axios.get({url:"/select/getDemoOptions?keyword="+params.id});
    `,
    api__params: ['params'],
    onChange__func: `console.log('ApiSelect====>:', e, v)`,
    onChange__params: ['e', 'v'],
    defaultContext__var: `{
      apiselect_1: '1',
}`,
    params__tpl: `{
      id: $\{apiselect_1},
}`,
    resultField: 'list',
    labelField: 'name',
    valueField: 'id',
    immediate: true,
    _update__func: `await this.getItemRef().run(this.formatTpl('params'))`,
    onOptionsChange__func: `console.log('get options', options.length, options);`,
    onOptionsChange__params: ['options'],
    onSearch__func: 'await this.getItemRef().run({id:keyword})',
    onSearch__params: ['keyword'],
    showSearch: false,
    defaultActiveFirstOption: false,
    notFoundContent: '暂无数据',
    showArrow: true,
    filterOption: false,
  },
  colProps: {
    span: 8,
  },
  defaultValue: null,
};
