<template>
  <div>
    <a-button-group v-bind="schema.componentProps">
      <Button
        v-for="(item, index) in schema.children"
        :key="item.buttonText"
        v-bind="itemAttr(item)"
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
  import { getAttrs } from '../../utils';

  const { schema } = getAttrs();
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
  const itemAttr = (item) => {
    const attrs = {};
    for (const name in item) {
      if (name.endsWith('__func') || name.endsWith('__params')) continue;
      attrs[name] = item[name];
    }
    return attrs;
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
  const click = (name) => {
    typeof name == 'number' ? clickByIdx(name) : clickByName(name);
    // if (typeof name == 'string') clickByName(name);
    // else if (typeof name == 'number') clickByIdx(name);
  };
  defineExpose({ click });
  //defineExpose({ clickByIdx, clickByName });
  onBeforeUnmount(() => {
    itemRefs.value = [];
  });
</script>
