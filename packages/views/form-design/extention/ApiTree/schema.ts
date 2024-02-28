import { treeOptionsListApi } from '@/api/demo/tree';

export default {
  label: '树',
  helpMessage: ['ApiTree组件', '使用接口提供的数据生成选项'],
  required: true,
  componentProps: {
    api: treeOptionsListApi,
    api__func: '',
    params: {
      count: 2,
    },
    afterFetch: (v) => {
      return v;
    },
    afterFetch__func: '',
    afterFetch__params: ['v'],
    resultField: 'list',
  },
  colProps: {
    span: 8,
  },
};
