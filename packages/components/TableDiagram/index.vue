<template>
  <!--  提供一个LF渲染的容器  -->
  <div ref="container" class="container"></div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  // 导入LF核心模块和对应的样式文件
  import LogicFlow from '@logicflow/core';
  import '@logicflow/core/dist/style/index.css';
  import { propTypes } from '@utils/propTypes';
  import TableNode from './tableNode';
  import tableEdge from './tableEdge';
  import TableColumn from './table.vue';
  // 声明容器的对应ref对象和LF对象
  const container = ref();
  const lf = ref<LogicFlow>();

  const props = defineProps({
    tables: propTypes.array,
    relations: propTypes.array,
  });
  const graphData = {
    nodes: props.tables.map((item) => {
      return { ...item, type: 'TableNode' };
    }),
    edges: props.relations.map((relation) => {
      return { ...relation, type: 'TableEdge' };
    }),
  };
  onMounted(() => {
    lf.value = new LogicFlow({
      container: container.value,
      grid: true,
    });

    lf.value.register(TableNode);
    lf.value.register(tableEdge);

    lf.value.render(graphData);
  });
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
