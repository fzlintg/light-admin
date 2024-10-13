<template>
  <div
    ><a-tooltip color="white" :title="jsonValue">
      <a-input v-model:value="jsonValue">
        <template #prefix
          ><Icon icon="ant-design:profile" class="hand" @click="visible = true"
        /></template>
        <template #suffix
          ><Icon icon="ant-design:form-outlined" class="hand" @click="openForm" v-if="formModel"
        /></template>
      </a-input>
    </a-tooltip>
    <Modal
      title="json编辑"
      :open="visible"
      @cancel="visible = false"
      @ok="handleGetData"
      :min-height="300"
    >
      <CodeEditor
        :value="editJsonValue"
        ref="jsonEditor"
        mode="javascript"
        :height="300"
        @change="editJsonValue = $event"
      />
    </Modal>
  </div>
</template>
<script setup>
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  import Modal from '@c/Modal/src/BasicModal.vue';
  import { CodeEditor } from '@c/CodeEditor';
  import { useMessage } from '@h/web/useMessage';
  import { formModelToData } from '../../utils';
  import { Tooltip as ATooltip } from 'ant-design-vue';

  const { createMessage } = useMessage();
  const props = defineProps({
    value: propTypes.object,
    defaultValue: propTypes.object,
    formModel: propTypes.string,
  });
  // const attrs = useAttrs();
  const [state] = useRuleFormItem(props, 'value', 'change');
  const jsonValue = ref(JSON.stringify(state.value || props.defaultValue, null, 4));
  const emit = defineEmits(['update:value']);
  const formRef = inject('getFormRef', () => {})();
  const topFormRef = formRef?.getTopFormRef();
  const editJsonValue = ref('');
  editJsonValue.value = jsonValue.value = JSON.stringify(state.value, null, 4);
  const visible = ref(false);
  watch(
    () => state.value,
    (data) => {
      editJsonValue.value = JSON.stringify(data, null, 4);
      jsonValue.value = JSON.stringify(data);

      //   editJsonValue.value = jsonValue.value = JSON.stringify(state.value, null, 4);
    },
  );
  //if (!state.value) state.value = props.defaultValue;
  const handleGetData = () => {
    try {
      state.value = eval(`(${editJsonValue.value})`);
      editJsonValue.value = jsonValue.value = JSON.stringify(state.value, null, 4);
      visible.value = false;
      emit('update:value', state.value);
    } catch (e) {
      createMessage.error(e.message);
    }
  };
  const formFinish = async () => {
    const modelRef = topFormRef?.getItemRef(props.formModel);
    state.value = formModelToData(await modelRef.getFormModel());
  };
  const openForm = () => {
    const modelRef = topFormRef?.getItemRef(props.formModel);
    modelRef.setProps(({ myProps }) => {
      myProps.value['title'] = '数据编辑';
    });
    modelRef.show(state.value, {}, { cb: { ok: formFinish } });
  };
</script>
