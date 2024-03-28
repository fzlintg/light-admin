//import { MODE } from '@c/CodeEditor';
import { TreeSelect } from 'ant-design-vue';

export default [
  {
    category: 'control',
    field: 'treeCheckable',
    label: '多选',
  },
  {
    field: 'showCheckedStrategy',
    component: 'Select',
    label: '展示方式',
    componentProps: {
      options: [
        { value: TreeSelect.SHOW_ALL, label: '全显示' },
        { value: TreeSelect.SHOW_PARENT, label: '显父节点' },
        { value: TreeSelect.SHOW_CHILD, label: '显子节点' },
      ],
    },
  },
];
