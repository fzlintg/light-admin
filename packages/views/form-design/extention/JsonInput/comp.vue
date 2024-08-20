<template>
  <a-input v-model:value="jsonValue">
    <template #prefix
      ><Icon icon="ant-design:profile" class="hand" @click="visible = true"
    /></template>
    <template #suffix
      ><Icon icon="ant-design:form-outlined" class="hand" @click="openForm" v-if="formModel"
    /></template>
  </a-input>

  <Modal
    title="json编辑"
    :open="visible"
    @cancel="visible = false"
    @ok="handleGetData"
    min-height="300"
  >
    <CodeEditor
      :value="editJsonValue"
      ref="jsonEditor"
      :mode="MODE.JAVACRIPT"
      :height="300"
      @change="editJsonValue = $event"
    />
  </Modal>
</template>
<script setup>
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  import Modal from '@c/Modal/src/BasicModal.vue';
  import { CodeEditor, MODE } from '@c/CodeEditor';
  import { useMessage } from '@h/web/useMessage';

  const { createMessage } = useMessage();
  const props = defineProps({
    value: propTypes.object,
    defaultValue: propTypes.object,
    formModel: propTypes.string,
  });
  // const attrs = useAttrs();
  const [state] = useRuleFormItem(props, 'value', 'change');
  const jsonValue = ref(JSON.stringify(state.value || props.defaultValue, null, 2));
  const emit = defineEmits(['update:value']);
  const formRef = inject('getFormRef', () => {})();
  const topFormRef = formRef?.getTopFormRef();
  const editJsonValue = ref('');
  editJsonValue.value = jsonValue.value;
  const visible = ref(false);
  watch(
    () => state.value,
    () => {
      jsonValue.value = JSON.stringify(state.value);
    },
  );
  //if (!state.value) state.value = props.defaultValue;
  const handleGetData = () => {
    try {
      state.value = eval(`(${editJsonValue.value})`);
      editJsonValue.value = jsonValue.value = JSON.stringify(state.value);
      visible.value = false;
      emit('update:value', state.value);
    } catch (e) {
      createMessage.error(e.message);
    }
  };
  const formFinish = async () => {
    const modelRef = topFormRef?.getItemRef(props.formModel);
    state.value = await modelRef.getFormModel();
    editJsonValue.value = jsonValue.value = JSON.stringify(state.value);
    emit('update:value', state.value);
  };
  const openForm = () => {
    const modelRef = topFormRef?.getItemRef(props.formModel);
    modelRef.setProps(({ myProps }) => {
      myProps.value['title'] = '数据编辑';
    });
    modelRef.show(state.value, {}, { cb: { ok: formFinish } });
  };
</script>
