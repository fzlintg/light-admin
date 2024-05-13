<template>
  <JsonViewer v-bind="attrs" />
</template>
<script setup>
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/index.css';

  const attrs = useAttrs();
</script>
