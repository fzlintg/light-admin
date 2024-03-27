<template>
  <card v-bind="schema.componentProps" class="w-full">
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
  </card>
</template>
<script setup>
  import VFormItem from '../../components/VFormItem/index.vue';

  import { Card } from 'ant-design-vue';

  const { schema, formData, formConfig, setFormModel } = toRefs(useAttrs());
</script>
