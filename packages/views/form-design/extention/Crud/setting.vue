<template>
  <div>
    <light-form logic="config.dbTable" :formModel="state.componentProps" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  //import { useMessage } from '@h/web/useMessage';
  import { useRuleFormItem } from '@h/component/useFormItem';

  const props = defineProps({
    schema: {
      type: Object,
      default: () => ({}),
    },
    props: {
      type: Object,
      default: () => ({}),
    },
  });
  const [state] = useRuleFormItem(props, 'props', 'update:props');
</script>
