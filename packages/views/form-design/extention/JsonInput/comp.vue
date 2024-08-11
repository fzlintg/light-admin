<template>
  <a-input v-model:value="jsonValue">
    <template #prefix
      ><Icon icon="ant-design:profile" class="hand" @click="visible = true"
    /></template>
  </a-input>
  <modal title="json编辑" :open="visible" @cancel="visible = false" @ok="handleGetData">
    <template #title>
      <div>
        <Icon icon="ant-design:profile" />
        <span>JSON编辑</span>
      </div>
    </template>

    <CodeEditor
      :value="jsonValue"
      ref="jsonEditor"
      :mode="MODE.JAVACRIPT"
      :height="500"
      @change="jsonValue = $event"
    />
  </modal>
</template>
<script setup>
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  import Modal from '@c/Modal/src/BasicModal.vue';
  import { CodeEditor, MODE } from '@c/CodeEditor';

  const props = defineProps({
    value: propTypes.string,
    defaultValue: propTypes.string,
  });
  const [state] = useRuleFormItem(props, 'value', 'change');
  const jsonValue = ref(JSON.stringify(state.value || props.defaultValue, null, 2));
  const visible = ref(false);
  //if (!state.value) state.value = props.defaultValue;
  const handleGetData = () => {
    state.value = eval(`(${jsonValue.value})`);
    visible.value = false;
    emit('update:value', state.value);
  };
</script>
