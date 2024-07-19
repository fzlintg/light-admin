<template>
  <div>
    <color-picker v-model:pureColor="state" />
  </div>
</template>
<script lang="ts" setup>
  import { ColorPicker } from 'vue3-colorpicker';
  import 'vue3-colorpicker/style.css';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';

  const props = defineProps({
    value: propTypes.string,
    defaultValue: propTypes.string,
  });

  const emit = defineEmits(['update:value']);
  const [state] = useRuleFormItem(props, 'value', 'change');

  state.value = state.value || props.defaultValue;

  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
    },
  );
</script>
