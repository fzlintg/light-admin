<template>
  <div
    >{{ state }},{{ props.table }},{{ schema.componentProps.table }}
    <light-form :logic="`crud.${props.db}.${state}.form`" />
  </div>
</template>
<script lang="ts" setup>
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { PropType, ref, useAttrs } from 'vue';

  const props = defineProps({
    db: {
      type: String as PropType<string>,
      default: '50vh',
    },
    table: {
      type: String as PropType<string>,
      default: '',
    },
  });
  const [state] = useRuleFormItem(props, 'table', 'change');
  const { schema } = toRefs(useAttrs());
</script>
