import { treeOptionsListApi } from '@/api/demo/tree';

export default {
  label: '远程下拉树',
  //  helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
  required: true,
  componentProps: {
    api: treeOptionsListApi,
    resultField: 'list',
    onChange: (e, v) => {
      console.log('ApiTreeSelect====>:', e, v);
    },
  },
  colProps: {
    span: 8,
  },
};
