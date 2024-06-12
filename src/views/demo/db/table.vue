<template>
  <div id="app">
    <TableDiagram :tables="tables" :relations="relations" />
  </div>
</template>

<script>
  import TableDiagram from '@c/TableDiagram/index.vue';

  export default {
    name: 'App',
    components: {
      TableDiagram,
    },
    data() {
      return {
        tables: [
          { id: 'table1', text: 'Users', x: 100, y: 100 },
          { id: 'table2', text: 'Orders', x: 400, y: 100 },
          { id: 'table3', text: 'Products', x: 250, y: 300 },
        ],
        relations: [
          { sourceNodeId: 'table1', targetNodeId: 'table2', type: '1-to-many', text: '1-to-many' },
          { sourceNodeId: 'table2', targetNodeId: 'table3', type: 'many-to-1', text: 'many-to-1' },
        ],
      };
    },
  };
</script>

<style>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }
</style>
