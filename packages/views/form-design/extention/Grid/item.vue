<template>
  <div class="grid-box">
    <Row class="grid-row" v-bind="schema.componentProps">
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
  </div>
</template>
<script setup>
  import { Row, Col } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';

  const { schema, formData, formConfig, setFormModel } = toRefs(useAttrs());
</script>
