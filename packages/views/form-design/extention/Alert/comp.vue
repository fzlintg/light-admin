<template>
  <alert :type="props.type" :message="props.message" />
</template>
<script setup>
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  import { Alert } from 'ant-design-vue';

  // const [state] = useRuleFormItem(props, 'value', 'change');
  const props = defineProps({
    value: propTypes.string || propTypes.function,
    message: propTypes.string,
    type: propTypes.string,
  });

  // Embedded in the form, just use the hook binding to perform form verification
</script>
<style>
  .code-prefix {
    margin-left: 30px;
  }
</style>
