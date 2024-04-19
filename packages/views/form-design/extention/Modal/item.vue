<template>
  <div>
    <modal
      v-model:open="open"
      v-bind="schema.componentProps"
      :centered="true"
      @ok="handleOk"
      @cancel="handleCancle"
    >
      <Form :form="fApi" :model="formModelNew">
        <VFormItem
          isRender
          inSubForm
          v-for="(item, k) in schema.children"
          :key="k"
          :schema="item"
          :formData="formModelNew"
          :formConfig="formConfig"
          :setFormModel="setFormModel"
        >
          <template #[key] v-for="(value, key) in item.componentProps?.slots">
            {{ value }}
          </template>
        </VFormItem>
      </Form>
    </modal>
  </div>
</template>
<script setup lang="ts">
  import VFormItem from '../../components/VFormItem/index.vue';
  import { Button as AButton, Form } from 'ant-design-vue';
  import Modal from '@c/Modal/src/BasicModal.vue';
  //import VFormCreate from '../../components/VFormCreate/v.vue';
  // import { formatRules } from '../../utils/index';

  const open = ref(false);
  const fApi = ref({});
  const formModelNew = ref({});
  const setFormModel = (key, value) => {
    formModelNew.value[key] = value;
  };
  const extraData = ref({});

  const { schema, formConfig } = toRefs(useAttrs());
  const emit = defineEmits([
    'dialogOpened',
    'okButtonClick',
    'cancelButtonClick',
    'dialogBeforeClose',
  ]);
  formConfig.value.children = schema.value.children;
  const show = (fData, eData) => {
    open.value = true;
    if (fData) formModelNew.value = fData;
    if (eData) extraData.value = eData;
    emit('dialogOpened');
  };
  const getFormModel = () => formModelNew.value;
  const handleOk = (e: MouseEvent) => {
    emit('okButtonClick', {
      callback: (result) => {
        open.value = !result;
      },
    });
  };
  const close = () => {
    emit('dialogBeforeClose', {
      callback: (result) => {
        open.value = !result;
      },
    });
  };
  const handleCancle = () => {
    emit('cancelButtonClick');
    close();
  };
  // onMounted(() => {});

  defineExpose({
    show,
    close,
    getFormModel,
    setFormModel,
    getExtraData: () => extraData.value,
  });
</script>
