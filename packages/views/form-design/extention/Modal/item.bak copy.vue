<template>
  <div>
    <modal
      v-model:open="open"
      v-bind="schema.componentProps"
      :centered="true"
      @ok="handleOk"
      @cancel="handleCancle"
    >
      <Form :form="fApi" :model="formModelNew" v-if="open">
        <VFormItem
          isRender
          inSubForm
          v-for="(item, k) in schema.children"
          :key="k"
          :schema="item"
          :formModel="formModelNew"
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
  import { flattenArray, flattenObject, formModelToData } from '../../utils';
  import { getCurrentInstance } from 'vue';
  //import VFormCreate from '../../components/VFormCreate/v.vue';
  // import { formatRules } from '../../utils/index';
  const _this = getCurrentInstance();
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
  //schema.value.children = flattenArray(schema.value.children);
  formConfig.value.children = schema.value.children;
  const show = (fData, eData) => {
    if (fData) {
      formModelNew.value = flattenObject(fData);
    }
    if (eData) extraData.value = eData;
    emit('dialogOpened', { fData: formModelNew.value, eData });
    open.value = true;
  };

  const handleOk = (e: MouseEvent) => {
    emit('okButtonClick', {
      _this,
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

  defineExpose({
    show,
    close,
    getFormModel: () => formModelNew.value,
    setFormModel,
    getExtraData: () => extraData.value,
    getFormData: () => formModelToData(formModelNew.value),
  });
</script>
