//import { optionsListApi } from '@/api/demo/select';

export default {
  label: 'API选择',
  type: 'select',
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
    _update__func: `await this.itemRef().run(this.item().formatTpl('params'))`,
    onOptionsChange__func: ``,
    onOptionsChange__params: ['options'],
    onSearch__func: 'await this.itemRef().run({id:keyword})',
    onSearch__params: ['keyword'],
    showSearch: false,
    defaultActiveFirstOption: false,
    notFoundContent: '暂无数据',
    showArrow: true,
    filterOption: false,
    allowInput: false,
    allowClear: true,
    mode: '',
  },
  colProps: {
    span: 24,
  },
  defaultValue: null,
};
