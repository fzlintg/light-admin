import { render } from 'nprogress';

export default {
  component: 'AutoComplete',
  label: '自动完成',
  icon: 'wpf:password1',
  colProps: { span: 24 },
  field: '',
  componentProps: {
    placeholder: '请输入关键字',
    valueField: 'id',
    labelField: 'name',
    api__func: `return await axios.get({url:'/autoComplete/getOptions?keyword='+params.keyword});`,
    api__params: ['params'],
    tplRender__func: `return h('span',data.id)`,
    tplRender__params: ['{h,r}'],
    defaultContext__var: `{
      key_input: '1',
}`,
    params__tpl: `{
      keyword: $\{key_input},
}`,
    resultField: '',
    onSelect__func: 'debugger;',
    // onSearch__params: ['key'],
    // onSearch__func: '',
    immediate: true,
  },
};
