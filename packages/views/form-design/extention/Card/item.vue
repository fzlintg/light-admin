<template>
  <Row class="grid-row w100">
    <Col
      class="grid-col"
      v-for="(colItem, index) in schema.columns"
      :key="index"
      :span="colItem.span"
    >
      <VFormItem
        isRender
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
  import VFormItem from '../../components/VFormItem/index.vue';

  import { Row, Col } from 'ant-design-vue';

  const { schema, formData, formConfig, setFormModel } = toRefs(useAttrs());
</script>
