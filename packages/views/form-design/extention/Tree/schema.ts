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
    renderIcon__func: `if (node.cnt === 1) {
      return 'ion:git-compare-outline$text-red';
    }
    if (node.cnt === 2) {
      return 'ion:home$text-blue';
    }
      return 'ant-design:down-circle-twotone';
  `,
    renderIcon__params: ['node'],
    renderItem__func: `return [h('span', {}, node.name), node.cnt>0?h('span', { class: 'text-red' }, '(' + node.cnt + ')'):''];`,
    renderItem__params: ['node', '{ h, r }'],
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
      pid: 'pid',
    },
    ifRender: false,
    db: '',
    table: '',
    search: false,
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
