//import { treeOptionsListApi } from '@/api/demo/tree';

export default {
  label: '高级树',
  type: 'select',
  icon: 'clarity:tree-view-line',
  componentProps: {
    hideSet: 'auto',
    title: '树',
    helpMessage: '树组件',

    //   api: treeOptionsListApi,
    //  treeData:[]
    initData__func: `return await axios.post({url:"/api/logic/getLogicData/test.tree.sys_dept"});
   `,
    loadData__func: `return await axios.post({url:"/api/logic/getLogicData/test.tree.sys_dept",data:{node:_.pick(node,['key','pos'])}})`,
    loadData__params: ['node'],
    edit: false,
    multiple: false,
    async: true,
    draggable: true,
    blockNode: true,
    contextMenu: false,
    allowDrop__func: 'return true',
    allowDrop__params: ['{ dropNode, dropPosition }'],
    fieldNames: {
      children: 'children',
      title: 'title',
      key: 'key',
      isLeaf: 'isleaf',
    },
    db: '',
    table: '',
  },
  // compEdit:{},
  colProps: {
    span: 24,
  },
  itemProps: {
    labelCol: {},
    wrapperCol: {},
    hiddenLabel: true,
  },
};
