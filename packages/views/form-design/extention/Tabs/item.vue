<template>
  <div class="grid-box mx-3">
    <tabs>
      <tab-pane v-for="(tabItem, index) in schema.columns" :key="index" :tab="tabItem.label">
        <VFormItem
          isRender
          v-for="(item, k) in tabItem.children"
          :key="k"
          :schema="item"
          :formData="formData"
          :formConfig="formConfig"
          :setFormModel="setFormModel"
        />
      </tab-pane>
    </tabs>
  </div>
</template>
<script setup>
  import { Tabs, TabPane } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';

  const { schema, formData, formConfig, setFormModel } = toRefs(useAttrs());
</script>
