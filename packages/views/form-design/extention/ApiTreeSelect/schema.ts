import { treeOptionsListApi } from '@/api/demo/tree';

export default {
  label: '下拉树',
  //  helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
  required: true,
  componentProps: {
    api: treeOptionsListApi,
    api__func:"",
    resultField: 'list',
    onChange: (e, v) => {
      console.log('ApiTreeSelect====>:', e, v);
    },
    treeCheckable:false,
    allowClear:true,
    placeholder:"请选择",
    onChange__params: ['e', 'v'],
  },
  colProps: {
    span: 8,
  },itemProps:{}
};
