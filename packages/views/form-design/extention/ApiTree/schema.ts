//import { treeOptionsListApi } from '@/api/demo/tree';

export default {
  label: 'API树',
  required: true,
  icon: 'clarity:tree-view-line',
  componentProps: {
    //   api: treeOptionsListApi,
    _update__func: `await this.getItemRef().fetch(this.formatTpl('params'))`,
    api__func: `return await axios.get({url:"/tree/getDemoOptions",params})`,
    api__params: ['params'],
    params__tpl: `{
      keyword: 'a',
    }`,
    afterFetch__func: 'return v',
    afterFetch__params: ['v'],
    resultField: 'list',
    checkable: false,

    //  treeData:[]
  },
  colProps: {
    span: 8,
  },
};
