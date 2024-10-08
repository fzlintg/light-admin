//import { treeOptionsListApi } from '@/api/demo/tree';

export default {
  label: '高级树',
  type: 'select',
  icon: 'clarity:tree-view-line',
  componentProps: {
    title: '树',
    helpMessage: '树组件',
    //   api: treeOptionsListApi,
    //  treeData:[]
    initData__func: `
return await axios.post({url:"/api/logic/getLogicData/test.tree.sys_dept"});
    /*return [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'leaf',
          key: '0-0-0',
        },
        {
          title: 'leaf',
          key: '0-0-1',
        },
      ],
    },
  ] */`,
    loadData__func: ` return new Promise((resolve) => {
      if (Array.isArray(node.children) && node.children.length > 0) {
        resolve();
        return;
      }
      setTimeout(() => {
        const asyncTreeAction = unref(asyncTreeRef);
        if (asyncTreeAction) {
          const nodeChildren = [
            { title: \`Child Node \${node.eventKey}-0\`, key: \`\${node.eventKey}-0\` },
            { title: \`Child Node \${node.eventKey}-1\`, key: \`\${node.eventKey}-1\` },
          ];
          asyncTreeAction.updateNodeByKey(node.eventKey, { children: nodeChildren });
          asyncTreeAction.setExpandedKeys(
            uniq([node.eventKey, ...asyncTreeAction.getExpandedKeys()]),
          );
        }

        resolve();
        return;
      }, 300);
    });
//return await axios.post({url:"/api/logic/getLogicData/test.tree.sys_dept",data:{node:_.pick(node,['key','pos'])}})`,
    loadData__params: ['node'],
    edit: false,
    multiple: false,
    async: true,
    fieldNames: {
      children: 'children',
      title: 'title',
      key: 'key',
      isLeaf: 'isleaf',
    },
  },
  colProps: {
    span: 24,
  },
  itemProps: {
    labelCol: {},
    wrapperCol: {},
    hiddenLabel: true,
  },
};
