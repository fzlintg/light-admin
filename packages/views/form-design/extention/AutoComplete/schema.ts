export default {
  label: '自动完成',
  icon: 'wpf:password1',
  colProps: { span: 24 },
  type: 'input',
  field: '',
  componentProps: {
    placeholder: '请输入关键字',
    valueField: 'id',
    labelField: 'name',
    api__func: `return await axios.get({url:'/autoComplete/getOptions?keyword='+params.keyword});`,
    api__params: ['params'],
    tplRender__func: `return h('span',data.value)`,
    tplRender__params: ['{h,r}', 'data'],
    defaultContext__var: `{
      key_input: '1',
}`,
    params__tpl: `{
      keyword: $\{key_input},
}`,
    resultField: '',
    onSelect__func: '',
    // onSearch__params: ['key'],
    // onSearch__func: '',
    immediate: true,
  },
};
