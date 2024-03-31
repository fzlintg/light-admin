<template>
  <div>
    <button @click="showModal">打开</button>
    <a-modal
      v-model:open="open"
      v-bind="schema.componentProps"
      :centered="true"
      @ok="handleOk"
      @cancel="closeModal"
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
    </a-modal>
  </div>
</template>
<script setup lang="ts">
  import VFormItem from '../../components/VFormItem/index.vue';
  import { Modal as AModal } from 'ant-design-vue';
  //import VFormCreate from '../../components/VFormCreate/v.vue';

  const open = ref(false);
  const fApi = ref({});
  const formModelNew = ref({});
  const setFormModel = (key, value) => {
    formModelNew.value[key] = value;
  };

  const { schema, formConfig } = toRefs(useAttrs());
  formConfig.value.children = schema.value.children;
  const showModal = () => {
    open.value = true;
  };
  const getFormModel = () => formModelNew.value;
  const handleOk = (e: MouseEvent) => {
    open.value = false;
  };
  const closeModal = () => {
    open.value = false;
  };
  defineExpose({
    showModal,
    closeModal,
    getFormModel,
    setFormModel,
  });
</script>
