<template>
  <BasicTree v-bind="treeOptions" :renderIcon="createIcon" :beforeRightClick="getRightMenuList" />
</template>

<script lang="ts" setup>
  import { computed, h, onMounted, reactive, useAttrs } from 'vue';
  import { BasicTree, TreeActionItem, ContextMenuItem } from '@c/Tree';

  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { EventDataNode } from 'ant-design-vue/es/vc-tree/interface';

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
  const treeData = ref([]);
  const treeOptions = computed(() => {
    return {
      ...attrs,
      ...(attrs.edit ? { actionList } : {}),
      treeData: treeData.value,
      ...(attrs.async ? { loadData: props.loadData } : {}),
    };
  });
  onMounted(async () => {
    treeData.value = await props.initData();
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
      render: () => {
        return h(DeleteOutlined);
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
          console.log('点击了删除', node);
        },
        icon: 'bx:bxs-folder-open',
      },
    ];
    return new Promise((resolve) => {
      resolve(menu);
    });
  }
</script>
