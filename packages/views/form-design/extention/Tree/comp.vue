<template>
  <BasicTree ref="treeRef" v-bind="treeOptions" :renderIcon="createIcon" @drop="onDrop" />
</template>

<script lang="ts" setup>
  import { computed, h, onMounted, reactive, useAttrs } from 'vue';
  import { BasicTree, TreeActionItem, ContextMenuItem } from '@c/Tree';

  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { EventDataNode } from 'ant-design-vue/es/vc-tree/interface';
  import { uniq } from 'lodash-es';
  import { AntTreeNodeDropEvent, TreeDataItem, TreeProps } from 'ant-design-vue/es/tree';
  import { defHttp as axios } from '@utils/http/axios';

  const props = defineProps({
    initData: {
      type: Function,
      default: () => [],
    },
    loadData: {
      type: Function,
      default: () => [],
    },
  });
  const attrs = reactive(useAttrs());
  const treeRef = ref();
  const treeData = ref([]);
  const loadData = async (node) => {
    let children = await props.loadData(node);
    treeRef.value.updateNodeByKey(node.eventKey, { children });
    treeRef.value.setExpandedKeys(uniq([node.eventKey, ...treeRef.value.getExpandedKeys()]));
  };
  const treeOptions = computed(() => {
    return {
      ...attrs,
      ...(attrs.edit ? { actionList } : {}),
      treeData: treeData.value,
      ...(attrs.async ? { loadData } : {}),
      ...(attrs.contextMenu ? { beforeRightClick: getRightMenuList } : {}),
    };
  });

  onMounted(async () => {
    treeData.value = await props.initData();
    console.log(treeOptions.value);
  });
  // const treeData = [
  //   {
  //     title: 'parent 1',
  //     key: '0-0',
  //     children: [
  //       {
  //         title: 'leaf',
  //         key: '0-0-0',
  //       },
  //       {
  //         title: 'leaf',
  //         key: '0-0-1',
  //       },
  //     ],
  //   },
  // ];
  const actionList: TreeActionItem[] = [
    {
      // show:()=>boolean;
      render: (node) => {
        return h(PlusOutlined, {
          class: 'ml-2',
          onClick: () => {
            handlePlus(node);
          },
        });
      },
    },
    {
      render: (node) => {
        return h(DeleteOutlined, {
          class: 'ml-2',
          onClick: () => {
            treeRef.value.deleteNodeByKey(node.key);
          },
        });
      },
    },
  ];

  function createIcon({ level }) {
    if (level === 1) {
      return 'ion:git-compare-outline';
    }
    if (level === 2) {
      return 'ion:home';
    }
    if (level === 3) {
      return 'ion:airplane';
    }
    return '';
  }
  function getRightMenuList(node: EventDataNode): Promise<ContextMenuItem[]> {
    const menu = [
      {
        label: '新增',
        handler: () => {
          console.log('点击了新增', node);
        },
        icon: 'bi:plus',
      },
      {
        label: '删除',
        handler: () => {
          treeRef.value.deleteNodeByKey(node.eventKey);
          console.log('点击了删除', node);
        },
        icon: 'bx:bxs-folder-open',
      },
    ];
    return new Promise((resolve) => {
      resolve(menu);
    });
  }
  function fixData(data){
    return data.forEach(item=>{
      if(item.children&&item.children.length>0){
        item.isLeaf=false;
        fixData(item.children);
      } else
      {
        item.isLeaf=true;
      }
    })
  }
  const dragTree=async ({dropKey,dragKey,node,list,action,push})=>{
    await unref(treeRef).appendNodeByKey({
         dropKey,
        node,list,
        action,
        push,
      });
      await axios.post({
        url: '/api/crud/tree/drag/base/sys_dept',
        data: { dropKey, dragKey, action },
      });
  }
  const onDrop = async (info) => {
    const dropKey = info.node.key; //目标节点
    const dragKey = info.dragNode.key; //拖放节点
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const tree = unref(treeRef);
    const data = [...treeData.value];
    let node = await tree.getNodeByKey(dragKey,data,true);
    let push='push',action='next';
    if (!info.dropToGap||
    (info.node.children || []).length > 0 && // Has children
      info.node.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      action='inner'
    }
     await dragTree({dropKey,dragKey,node,list:data,action:"inner",push})
    fixData(data);
    treeData.value=[...data];
  };
  const onDrop2 = async (info: AntTreeNodeDropEvent) => {
    const dropKey = info.node.key; //目标节点
    const dragKey = info.dragNode.key; //拖放节点
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data: TreeProps['treeData'], key: string | number, callback: any) => {
      data.forEach((item, index) => {
        if (item.key === key) {
          return callback(item, index, data);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...treeData.value];

    // Find dragObject
    let dragObj: TreeDataItem;
    loop(data, dragKey, (item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
      arr.splice(index, 1); //删掉拖放节点数据
      dragObj = item;
    });
    if (!info.dropToGap) {
      //子节点
      loop(data, dropKey, (item: TreeDataItem) => {
        item.children = item.children || [];
        /// where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
      await axios.post({
        url: '/api/crud/tree/drag/base/sys_dept',
        data: { dropKey, dragKey, type: 'inner' },
      });
    } else if (
      //子节点排第一个
      (info.node.children || []).length > 0 && // Has children
      info.node.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item: TreeDataItem) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
      await axios.post({
        url: '/api/crud/tree/drag/base/sys_dept',
        data: { dropKey, dragKey, type: 'inner' },
      });
    } else {
      let ar: TreeProps['treeData'] = [];
      let i = 0;
      loop(data, dropKey, (_item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj); //前插
      } else {
        ar.splice(i + 1, 0, dragObj); //后插
      }
      await axios.post({
        url: '/api/crud/tree/drag/base/sys_dept',
        data: { dropKey, dragKey, type: 'prev' },
      });
    }
    treeData.value = data;
  };
</script>
