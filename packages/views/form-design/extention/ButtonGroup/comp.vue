<template>
  <div>
    <a-button-group v-bind="schema.componentProps">
      <Button
        v-for="(item, index) in schema.children"
        :key="item.buttonText"
        v-bind="item"
        :ref="setItemRef(index)"
      >
        {{ item.buttonText }}
      </Button>
    </a-button-group>
  </div>
</template>
<script setup>
  import { Button, ButtonGroup as AButtonGroup } from 'ant-design-vue';
  import { findIndex } from 'lodash-es';

  const { schema } = toRefs(useAttrs());
  const itemRefs = ref([]);
  const setItemRef = (index) => {
    return (el) => {
      if (el) {
        if (!itemRefs.value[index]) {
          itemRefs.value[index] = el;
        }
      }
    };
  };
  const clickByIdx = (index) => {
    itemRefs.value[index].$el.click();
  };
  const clickByName = (name) => {
    const idx = findIndex(schema.value.children, { buttonText: name });
    if (idx > -1) {
      clickByIdx(idx);
    }
  };
  defineExpose({ clickByIdx, clickByName });
  onBeforeUnmount(() => {
    itemRefs.value = [];
  });
</script>
