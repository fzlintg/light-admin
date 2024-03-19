<template>
  <div class="grid-box mx-3 sub-form-container">
    <Row class="header-row bg-light b-1">
      <a-button>新增</a-button>
    </Row>
    <div>
      <Row class="sub-form-row" v-bind="schema.componentProps">
        <Col>
          <a-button type="primary" shape="circle" :icon="h(PlusOutlined)" />
        </Col>
        <Col
          class="grid-col my-3"
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
  </div>
</template>
<script setup>
  import { Row, Col, Button as AButton } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';
  import { h } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';

  const { schema, formData, formConfig, setFormModel } = toRefs(useAttrs());
</script>
<style lang="scss" scoped>
  .sub-form-container {
    margin-bottom: 8px;
    text-align: left; //IE浏览器强制居左对齐

    :deep(div.header-row) {
      display: flex;
      padding: 0;
    }

    :deep(div.sub-form-row) {
      display: flex;
      align-items: center;
      padding: 0;
      border: 1px solid #e1e2e3;

      .row-number-span {
        margin-left: 16px;
      }
    }
  }
</style>
