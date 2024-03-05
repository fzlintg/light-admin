<template>
  <alert v-bind="attrs" />
</template>
<script setup>
  import { Alert } from 'ant-design-vue';

  const attrs = useAttrs();
</script>
