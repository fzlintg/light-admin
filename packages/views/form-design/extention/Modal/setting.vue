<template>
  <light-form
    logic="system.ds.edit"
    :formModel="formState.componentProps"
    debug
    @update:form-model="updateFormModel"
  />
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';

  import { useRuleFormItem } from '@h/component/useFormItem';

  //import { mergeSchema } from './schema.ts';

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

  const [formState] = useRuleFormItem(props, 'props', 'update:props');

  const updateFormModel = (value) => {
    Object.assign(formState.value.componentProps, value);
  };
  onMounted(() => {});
</script>
