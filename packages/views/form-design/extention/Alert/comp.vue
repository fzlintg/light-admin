<template>
  <div>
    <alert v-bind="schema.componentProps" />
  </div>
</template>
<script setup>
  import { Alert } from 'ant-design-vue';

  const { schema } = toRefs(useAttrs());
</script>
