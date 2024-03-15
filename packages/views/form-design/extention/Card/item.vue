<template>
  <Row class="grid-row w100">
    <Col
      class="grid-col"
      v-for="(colItem, index) in schema.columns"
      :key="index"
      :span="colItem.span"
    >
      <FormRender
        v-for="(item, k) in colItem.children"
        :key="k"
        :schema="item"
        :formData="formData"
        :formConfig="formConfig"
        :setFormModel="setFormModel"
      />
    </Col>
  </Row>
</template>
<script setup>
  import FormRender from '@views/form-design/components/VFormCreate/components/FormRender.vue';
  import { Row, Col, Tabs, TabPane, Card } from 'ant-design-vue';
  const { schema, formData, formConfig, setFormModel } = toRefs(getAttrs());
</script>
