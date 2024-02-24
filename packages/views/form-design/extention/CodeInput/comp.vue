<template>
  <a-button @click="handleShow" v-bind="$attrs"> {{ props.buttonText }} </a-button>
  <BasicModal destroyOnClose @register="register" :title="props.editorTitle" @ok="handleOk">
    <BasicForm @register="registerForm" />
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
  import { BasicModal, useModal } from '@c/Modal';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  import { BasicForm, useForm } from '@c/Form';
  // import VFormCreate from '../../components/VFormCreate/index.vue';
  import { formConfig } from '../helper';
  import { cloneDeep } from 'lodash-es';

  const props = defineProps({
    value: propTypes.string || propTypes.function,
    buttonText: propTypes.string,
    mode: MODE,
    editorTitle: propTypes.string,
    readonly: { type: Boolean },
    autoFormat: { type: Boolean, default: true },
    bordered: { type: Boolean, default: true },
  });
  const emit = defineEmits(['update:value']);
  // const loading = ref(true);
  // const lines = ref(10);
  const attrs = ref(cloneDeep(formConfig));
  const schemas = [
    {
      field: 'code_input',
      component: 'Code',
      label: '代码',
      componentProps: {
        mode: 'application/json',
        bordered: true,
        autoFormat: true,
        readonly: false,
        height: 10,
        prefix: 'function(){',
        suffix: '}',
      },
      colProps: {
        span: 24,
      },
    },
  ];
  const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
    schemas,
    showActionButtonGroup: false,
  });
  // const fApi = ref({}),
  //   formModel = ref({});
  // const onSubmit = () => {};
  //attrs.value.
  const [register, { openModal, closeModal }] = useModal();
  const [state] = useRuleFormItem(props, 'value', 'change');
  //const { t } = useI18n();
  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
    },
  );
  // Embedded in the form, just use the hook binding to perform form verification

  const handleOk = async () => {
    const data = await getFieldsValue();
    // debugger;
    state.value = data.code_input;
    closeModal();
  };
  const handleShow = async () => {
    openModal();
    const code_input = state.value;
    await setFieldsValue({ code_input });
  };
</script>
