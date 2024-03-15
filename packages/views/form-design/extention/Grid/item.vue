<template>
   <Card v-bind="schema.componentProps" class="mx-3 w100">
      <template #[key] v-for="(value, key) in schema.componentProps?.slots">
        {{ value }}
      </template>
      <FormRender
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
  import FormRender from '@views/form-design/components/VFormCreate/components/FormRender.vue';
  import { Card } from 'ant-design-vue';
  const { schema, formData, formConfig, setFormModel } = toRefs(getAttrs());
</script>
