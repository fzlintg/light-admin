<template>
  <div class="grid-box mx-3 flex-1">
    <tabs v-bind="schema.componentProps">
      <tab-pane v-for="(tabItem, index) in schema.columns" :key="index" :tab="tabItem.label"
        ><Row class="d-flex">
          <VFormItem
            isRender
            v-for="(item, k) in tabItem.children"
            :key="k"
            :schema="item"
            :formData="formData"
            :formModel="formModel"
            :formConfig="formConfig"
            :setFormModel="setFormModel"
            :getFormItem="getFormItem"
            @change="handleChange"
          />
        </Row>
      </tab-pane>
    </tabs>
  </div>
</template>
<script setup>
  import { Tabs, TabPane, Row } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';

  const { schema, formData, formModel, formConfig, setFormModel, getFormItem, handleChange } =
    toRefs(useAttrs());
</script>
