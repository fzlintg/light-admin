<template>
  <a-button type="primary" @click="showModal">Open Modal</a-button>
  <a-modal v-model:open="open" v-bind="schema.componentProps" @ok="handleOk">
    <template #[key] v-for="(value, key) in schema.componentProps?.slots">
      {{ value }}
    </template>
    <VFormItem
      isRender
      v-for="(item, k) in schema.children"
      :key="k"
      :schema="item"
      :formData="formData"
      :formConfig="formConfig"
      :setFormModel="setFormModel"
    />
  </a-modal>
</template>
<script setup lang="ts">
  import VFormItem from '../../components/VFormItem/index.vue';

  import { Modal as AModal } from 'ant-design-vue';

  const open = ref(false);
  const { schema, formData, formConfig, setFormModel } = toRefs(useAttrs());
  const showModal = () => {
    open.value = true;
  };
  const handleOk = (e: MouseEvent) => {
    console.log(e);
    open.value = false;
  };
</script>
