import { treeOptionsListApi } from '@/api/demo/tree';

export default {
  label: 'API树',
  helpMessage: ['ApiTree组件', '使用接口提供的数据生成选项'],
  required: true,
  icon: 'clarity:tree-view-line',
  componentProps: {
    api: treeOptionsListApi,
    api__func: '',
    api__params: ['params'],
    params: {
      count: 2,
    },
    afterFetch: (v) => {
      return v;
    },
    afterFetch__func: '',
    afterFetch__params: ['v'],
    resultField: 'list',
    checkable: false,
    //  treeData:[]
  },
  colProps: {
    span: 8,
  },
};
