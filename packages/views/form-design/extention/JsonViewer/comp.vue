<template>
  <JsonViewer v-bind="attrs" :value="state" />
</template>
<script setup>
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/index.css';
  import { useRuleFormItem } from '@h/component/useFormItem';

  const props = defineProps({
    value: propTypes.string,
    defaultValue: propTypes.string,
  });
  const [state] = useRuleFormItem(props, 'value', 'change');

  if (!state.value) state.value = state.defaultValue;
</script>
