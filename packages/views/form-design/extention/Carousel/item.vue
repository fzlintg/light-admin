<template>
  <Carousel
    v-bind="schema.componentProps"
    :style="{ background: schema.componentProps.background, height: schema.componentProps.height }"
    class="w-full"
  >
    <template #[key] v-for="(value, key) in schema.componentProps?.slots">
      {{ value }}
    </template>
    <div :key="k" v-for="(item, k) in schema.children" style="height: 100%">
      <VFormItem
        isRender
        :schema="item"
        :formData="formData"
        :formConfig="formConfig"
        :setFormModel="setFormModel"
      />
    </div>
  </Carousel>
</template>
<script setup>
  import VFormItem from '../../components/VFormItem/index.vue';

  import { Carousel } from 'ant-design-vue';

  const { schema, formData, formConfig, setFormModel } = toRefs(useAttrs());
</script>
<style scoped>
  /* For demo */
  :deep(.slick-slide) {
    overflow: hidden;
    line-height: 160px;
    text-align: center;
  }

  :deep(.slick-slide h3) {
    color: #fff;
  }

  :deep(.slick-dots) {
    position: relative;
    height: auto;
  }
</style>
