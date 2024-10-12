<template>
  <BasicTree ref="treeRef" v-bind="treeOptions" @drop="onDrop">
    <template #title="item"> <component :is="getTitle(item)" /> </template>
  </BasicTree>
  <light-form
    v-if="!!attrs.table"
    :logic="`crud.${attrs.db}.${attrs.table}.insert`"
    @submit="saveData"
    ref="insertFormRef"
    :options="tableOptions"
  />
</template>

<script lang="ts" setup>
  import {
    computed,
    getCurrentInstance,
    h,
    onMounted,
    provide,
    reactive,
    resolveComponent,
    useAttrs,
  } from 'vue';
  import { BasicTree, TreeActionItem, ContextMenuItem } from '@c/Tree';

  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { EventDataNode } from 'ant-design-vue/es/vc-tree/interface';
  import { uniq, pick } from 'lodash-es';
  //import { AntTreeNodeDropEvent, TreeDataItem, TreeProps } from 'ant-design-vue/es/tree';
  import { defHttp as axios } from '@utils/http/axios';
  import { useMessage } from '@h/web/useMessage';

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
    renderItem: {
      type: Function,
      default: () => [],
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
  const { createMessage } = useMessage();
  provide('options', tableOptions);
  const { proxy } = getCurrentInstance();
  const getTitle = (item) => {
    return {
      render() {
        return props.renderItem.call(proxy, item, { h, r: resolveComponent });
        //      return [h('span', {}, item.name), h('span', { class: 'text-red' }, '(' + item.cnt + ')')];
      },
    };
  };
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
    if (props.hideSet === 'auto' && !attrs.table) return;
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

  // function createIcon({ level }) {
  //   if (level === 1) {
  //     return 'ion:git-compare-outline';
  //   }
  //   if (level === 2) {
  //     return 'ion:home';
  //   }
  //   if (level === 3) {
  //     return 'ion:airplane';
  //   }
  //   return '';
  // }
  function getRightMenuList(node: EventDataNode): Promise<ContextMenuItem[]> {
    const menu = [
      {
        label: '新增节点',
        handler: async () => {
          editForm.value.setProps(({ myProps }) => {
            myProps.value = { title: '新增节点' };
          });
          let parent = await treeRef.value.getParentNodeByKey(node.eventKey);
          editForm.value.show(
            { [attrs.fieldNames.pid]: parent[attrs.fieldNames.key] },
            { type: 'insert', id: node.key },
          );
        },
        icon: 'bi:plus',
      },
      {
        label: '新增子节点',
        handler: () => {
          editForm.value.setProps(({ myProps }) => {
            myProps.value = { title: '新增子节点' };
          });
          editForm.value.show(
            { [attrs.fieldNames.pid]: node[attrs.fieldNames.key] },
            { type: 'insertChild', id: node.key },
          );
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
        handler: async () => {
          treeRef.value.deleteNodeByKey(node.eventKey);
          let data = await axios.delete({
            url: `/api/crud/removeRecord/${attrs.db}/${attrs.table}/${node.key}`,
          });
          createMessage.success('删除成功');
          console.log('点击了删除', data);
        },
        icon: 'ant-design:delete-twotone',
      },
    ];
    return new Promise((resolve) => {
      resolve(menu);
    });
  }

  const saveData = async ({ data, type = 'insert', id }) => {
    let result = await axios.post({
      url: `/api/crud/saveRecord/${attrs.db}/${attrs.table}`,
      data,
    });
    if (type == 'update')
      treeRef.value.updateNodeByKey(data[attrs.fieldNames.key], {
        [attrs.fieldNames.title]: data[attrs.fieldNames.title],
      });
    else {
      treeRef.value.appendNodeByKey({
        dropKey: id,
        node: {
          ...pick(data, [attrs.fieldNames.key, attrs.fieldNames.title]),
          [attrs.fieldNames.key]: result[attrs.fieldNames.key],
          isLeaf: true,
        },
        list: treeData.value,
        action: type == 'insertChild' ? 'inner' : 'next',
        push: 'push',
      });
    }
    createMessage.success('保存成功');
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
