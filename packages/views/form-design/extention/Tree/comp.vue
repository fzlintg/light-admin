<template>
  <BasicTree ref="treeRef" v-bind="treeOptions" :renderIcon="createIcon" @drop="onDrop" />

  <light-form
    :logic="`crud.${attrs.db}.${attrs.table}.insert`"
    @submit="saveData"
    ref="insertFormRef"
    :options="tableOptions"
  />
</template>

<script lang="ts" setup>
  import { computed, h, onMounted, provide, reactive, useAttrs } from 'vue';
  import { BasicTree, TreeActionItem, ContextMenuItem } from '@c/Tree';

  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { EventDataNode } from 'ant-design-vue/es/vc-tree/interface';
  import { uniq, pick } from 'lodash-es';
  //import { AntTreeNodeDropEvent, TreeDataItem, TreeProps } from 'ant-design-vue/es/tree';
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
    hideSet: {
      type: String,
      default: 'general',
    },
  });
  const attrs = reactive(useAttrs());
  const treeRef = ref();
  const treeData = ref([]);
  const tableOptions = ref({});
  const insertFormRef = ref(null);
  const editForm = computed(() => {
    return insertFormRef.value.vformRef.getItemRef('modal_1');
  });
  provide('options', tableOptions);
  const loadData = async (node) => {
    let children =
      props.hideSet === 'auto'
        ? await axios.post({
            url: `/api/crud/tree/query/${attrs.db}/${attrs.table}`,
            data: pick(node, ['pos', 'key']),
          })
        : await props.loadData(node);
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
    await initData();
  });
  watch(
    () => attrs.table,
    async () => {
      await initData();
    },
  );

  const initData = async () => {
    treeData.value =
      props.hideSet === 'auto'
        ? await axios.post({ url: `/api/crud/tree/query/${attrs.db}/${attrs.table}` })
        : await props.initData();

    let { options } = await axios.get({
      url: `/api/crud/getQueryDict/${attrs.db}/${attrs.table}`,
    });
    tableOptions.value = options;
  };
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
          editForm.value.setProps(({ myProps }) => {
            myProps.value = { title: '新增数据' };
          });
          editForm.value.show({}, { type: 'insert' });
        },
        icon: 'bi:plus',
      },
      {
        label: '编辑',
        handler: async () => {
          let nodeData = await axios.get({
            url: `/api/crud/tree/nodeQuery/${attrs.db}/${attrs.table}/${node.key}`,
          });
          editForm.value.setProps(({ myProps }) => {
            myProps.value = { title: '修改数据' };
          });
          editForm.value.show(
            nodeData,
            { type: 'update', row: nodeData },
            { raw: true, dict: true },
          );
        },
        icon: 'ant-design:edit-outlined',
      },
      {
        label: '删除',
        handler: () => {
          treeRef.value.deleteNodeByKey(node.eventKey);
          console.log('点击了删除', node);
        },
        icon: 'ant-design:delete-twotone',
      },
    ];
    return new Promise((resolve) => {
      resolve(menu);
    });
  }

  const saveData = async ({ data, type = 'insert' }) => {
    let result = await axios.post({
      url: `/api/crud/saveData/${attrs.db}/${attrs.table}`,
      data: {
        [type == 'insert' ? 'insertRecords' : 'updateRecords']: data,
      },
    });
    if (type == 'update') treeRef.value.updateNodeByKey(data.id, { title: data.name });
    console.log(result);
  };
  function fixData(data) {
    return data.forEach((item) => {
      if (item.children && item.children.length > 0) {
        item.isLeaf = false;
        fixData(item.children);
      } else {
        item.isLeaf = true;
      }
    });
  }
  const dragTree = async ({ dropKey, dragKey, node, list, action, push }) => {
    await unref(treeRef).appendNodeByKey({
      dropKey,
      node,
      list,
      action,
      push,
    });
    await axios.post({
      url: `/api/crud/tree/drag/${attrs.db}/${attrs.table}`,
      data: { dropKey, dragKey, action },
    });
  };
  const onDrop = async (info) => {
    const dropKey = info.node.key; //目标节点
    const dragKey = info.dragNode.key; //拖放节点
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const tree = unref(treeRef);
    const data = [...treeData.value];
    let node = await tree.getNodeByKey(dragKey, data, true);
    let push = 'push',
      action = 'next';
    if (
      !info.dropToGap ||
      ((info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1) // On the bottom gap
    ) {
      action = 'inner';
    }
    await dragTree({ dropKey, dragKey, node, list: data, action, push });
    fixData(data);
    treeData.value = [...data];
  };
</script>
