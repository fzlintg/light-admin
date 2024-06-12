<template>
  <div class="custom-node">
    <div>{{ nodeData.text }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      nodeData: {
        type: Object,
        default: () => ({}),
      },
    },
  };
</script>

<style scoped>
  .custom-node {
    padding: 10px;
    border: 1px solid #000;
    background-color: #fff;
  }
</style>
