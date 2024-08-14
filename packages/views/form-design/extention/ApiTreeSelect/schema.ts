//import { treeOptionsListApi } from '@/api/demo/tree';
import { TreeSelect } from 'ant-design-vue';

export default {
  label: 'API下拉树',
  //  helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
  required: true,
  icon: 'clarity:tree-view-line',
  componentProps: {
    api__func: `return await axios.get({url:"/tree/getDemoOptions",params})`,
    api__params: ['params'],
    resultField: 'list',
    onChange__func: `console.log('ApiTreeSelect====>:', e, v)`,
    onChange__params: ['e', 'v'],
    treeCheckable: true,
    showCheckedStrategy: TreeSelect.SHOW_ALL,
    allowClear: true,
    placeholder: '请选择',
    fieldNames: {
      children: 'children',
      label: 'title',
      value: 'key',
    },
  },
  colProps: {
    span: 8,
  },
  itemProps: {},
};
