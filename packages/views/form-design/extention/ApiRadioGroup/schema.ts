//import { optionsListApi } from '@/api/demo/select';

export default {
  component: 'ApiRadioGroup',
  label: 'API单选',
  icon: 'ant-design:check-circle-outlined',
  //  helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
  type: 'select',
  componentProps: {
    // api: optionsListApi,
    _update__func: `await this.getItemRef().fetch(this.formatTpl('params'))`,
    api__func: `return await axios.get({url:"/select/getDemoOptions?count="+params.count});`,
    api__params: ['params'],
    onChange__func: ``,
    onChange__params: ['e'],
    defaultContext__var: `{
      input_1: 3,
}`,
    isBtn: true,
    params__tpl: `{
      count: $\{input_1},
}`,
    resultField: 'list',
    // use name as label
    labelField: 'name',
    // use id as value
    valueField: 'id',
  },
  defaultValue: null,
  colProps: {
    span: 8,
  },
};
