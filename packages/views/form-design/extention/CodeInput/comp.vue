<template>
  <a-button @click="openModal" v-bind="$attrs"> {{ props.buttonText }} </a-button>
  <BasicModal
    width="1000px"
    destroyOnClose
    @register="register"
    :title="props.editorTitle"
    @ok="handleOk"
  >
    <BasicForm @register="registerForm" />
    <template #insertFooter> </template>
  </BasicModal>
</template>
<script setup>
  import { BasicModal, useModal } from '@c/Modal';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  import { BasicForm, useForm } from '@c/Form';
  import { Button as AButton } from 'ant-design-vue';

  const props = defineProps({
    value: propTypes.string || propTypes.function,
    buttonText: propTypes.string,
    mode: propTypes.string,
    editorTitle: propTypes.string,
    readonly: { type: Boolean },
    autoFormat: { type: Boolean, default: true },
    bordered: { type: Boolean, default: true },
    prefix: propTypes.string,
    suffix: propTypes.string,
  });
  const emit = defineEmits(['update:value']);
  const schemas = [
    {
      field: 'code_input',
      component: 'Code',
      label: '代码',
      componentProps: {
        mode: 'json',
        bordered: true,
        autoFormat: true,
        readonly: false,
        height: 400,
        prefix: props.prefix ?? 'function(){',
        suffix: props.suffix ?? '}',
      },
      colProps: {
        span: 24,
      },
    },
  ];

  const [register, { openModal, closeModal }] = useModal(); //对话框注册
  const [state] = useRuleFormItem(props, 'value', 'change');
  const model = computed(() => {
    return {
      code_input: state.value,
    };
  });

  const [registerForm, { getFieldsValue }] = useForm({
    schemas,
    showActionButtonGroup: false,
    model,
  });
  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
    },
  );
  const handleOk = async () => {
    const data = await getFieldsValue();
    state.value = data.code_input;
    closeModal();
  };
  const formatCode = async () => {
    const data = await getFieldsValue();
    state.value = data.code_input;
  };
</script>
