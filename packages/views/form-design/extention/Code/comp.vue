<template>
  <a-alert
    v-if="props.prefix && props.prefix != ''"
    :message="props.prefix"
    type="info"
    class="code-prefix"
  />

  <CodeEditor v-bind="attrs" v-model:value="state" />

  <a-alert
    v-if="props.suffix && props.suffix != ''"
    :message="props.suffix"
    type="info"
    class="code-prefix"
  />
</template>
<script setup>
  import { CodeEditor } from '@c/CodeEditor';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  //import { Alert as AAlert } from 'ant-design-vue';

  const props = defineProps({
    prefix: propTypes.string,
    suffix: propTypes.string,
    value: propTypes.string,
    defaultValue:propTypes.string,
  });

  const attrs = useAttrs();
  const emit = defineEmits(['update:value']);
  const [state] = useRuleFormItem(props, 'value', 'change');

  state.value=state.value||props.defaultValue||''
  //const { t } = useI18n();
  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
    },
  );
  // Embedded in the form, just use the hook binding to perform form verification
</script>
<style>
  .code-prefix {
    margin-left: 30px;
  }
</style>
