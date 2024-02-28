import { on } from '@utils/domUtils';
import { treeOptionsListApi } from '@/api/demo/tree';

export default {
  label: '下拉树',
  //  helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
  required: true,
  componentProps: {
    api: treeOptionsListApi,
    resultField: 'list',
    onChange: (e, v) => {
      console.log('ApiTreeSelect====>:', e, v);
    },
    onChange__params: ['e', 'v'],
  },
  colProps: {
    span: 8,
  },
};
