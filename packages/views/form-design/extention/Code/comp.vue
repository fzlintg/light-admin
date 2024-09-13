<template>
  <div>
    <a-alert
      v-if="props.prefix && props.prefix != ''"
      :message="props.prefix"
      type="info"
      class="code-prefix"
    />
    <CodeEditor v-bind="attrs" v-model="state" />
    <a-alert
      v-if="props.suffix && props.suffix != ''"
      :message="props.suffix"
      type="info"
      class="code-prefix"
    />
  </div>
</template>
<script setup>
  import { CodeEditor } from '@c/CodeEditor';
//  import CodeEditor from "@c/EditorCode/Editor.vue"
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  //import { Alert as AAlert } from 'ant-design-vue';

  const props = defineProps({
    prefix: propTypes.string,
    suffix: propTypes.string,
    value: propTypes.string | propTypes.object,
    defaultValue: propTypes.string,
  });

  const attrs = reactive(useAttrs());
  const emit = defineEmits(['update:value']);
  const [state] = useRuleFormItem(props, 'value', 'change');
  if (typeof state.value == 'object') state.value = JSON.stringify(state.value);
  else state.value = state.value || props.defaultValue || '';

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
