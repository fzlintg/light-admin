<template>
  <light-form :logic="`crud.${db}.${table}.detail`" />
</template>
<script lang="ts" setup>
  import { PropType, ref, useAttrs } from 'vue';

  const props = defineProps({
    db: {
      type: String as PropType<string>,
      default: '50vh',
    },
    table: {
      type: Object as PropType<Object>,
      default: () => {},
    },
  });
</script>
