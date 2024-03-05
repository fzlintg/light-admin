<template>
  <card v-bind="attrs" />
</template>
<script setup>
  import { Card } from 'ant-design-vue';

  const attrs = useAttrs();
</script>
