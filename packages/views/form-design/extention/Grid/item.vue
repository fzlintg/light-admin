<template>
  <Card v-bind="schema.componentProps" class="mx-3 w100">
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
  </Card>
</template>
<script setup>
  import { Card } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';

  const { schema, formData, formConfig, setFormModel } = toRefs(useAttrs());
</script>
