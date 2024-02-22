<template>
  <a-button @click="openModal" v-bind="$attrs"> {{ props.buttonText }} </a-button>
  <BasicModal
    destroyOnClose
    @register="register"
    :title="props.editorTitle"
    @open-change="handleShow"
    @ok="handleOk"
  >
    <CodeEditor
      v-model:value="state"
      :mode="props.mode"
      :readonly="props.readonly"
      :autoFormat="props.autoFormat"
      :bordered="props.bordered"
    />
  </BasicModal>
</template>
<script setup>
  import { CodeEditor, MODE } from '@c/CodeEditor';
  import { BasicModal, useModalInner, useModal } from '@c/Modal';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';

  const props = defineProps({
    value: propTypes.string,
    buttonText: propTypes.string,
    mode: MODE,
    editorTitle: propTypes.string,
    readonly: { type: Boolean },
    autoFormat: { type: Boolean, default: true },
    bordered: { type: Boolean, default: true },
  });
  const emit = defineEmits(['update:value']);
  const loading = ref(true);
  const lines = ref(10);
  //const [, { setModalProps, redoModalHeight }] = useModalInner();
  const [register, { openModal, closeModal }] = useModal();
  //const modeValue = ref < MODE > MODE.JSON;
  // const emitData = ref('');
  const value = ref('');
  //const { t } = useI18n();
  watch(
    () => value,
    (v) => {
      emit('update:value', v);
    },
  );
  // Embedded in the form, just use the hook binding to perform form verification
  const [state] = useRuleFormItem(props, 'value', 'change', value);

  const handleOk = () => {
    closeModal();
  };
  const handleShow = () => {
    // setModalProps({
    //   title: '代码编辑器',
    //   width: 1000,
    //   centered: true,
    //   maskClosable: true,
    //   okText: '确定',
    //   cancelText: '取消',
    //   onOk: () => {
    //     redoModalHeight();
    //   },
    // });
    // loading.value = true;
    // setTimeout(() => {
    //   loading.value = false;
    // });
  };
</script>
