<template>
  <div class="operating-area" :style="{ width: schema.width }">
    <div class="left-btn-box">
      <Tooltip v-for="(item, index) in schema.children" :title="item.title" :key="item.title">
        <a class="toolbar-text" @click="item.click" :ref="setItemRef(index)">
          <Icon :icon="item.icon" />
        </a> </Tooltip></div
  ></div>
</template>
<script setup lang="ts">
  import { Tooltip } from 'ant-design-vue';
  import { findIndex } from 'lodash-es';
  import { onBeforeUnmount, toRefs } from 'vue';
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
  const clickByIdx = (index) => {
    itemRefs.value[index].click();
  };
  const clickByName = (name) => {
    const idx = findIndex(schema.value.children, { title: name });
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
  onBeforeUnmount(() => {
    itemRefs.value = [];
  });
</script>
<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import url('../../components/VFormDesign/styles/variable.less');

  .operating-area {
    display: flex;
    height: @operating-area-height;
    padding: 0 12px;
    padding-left: 0;
    border-bottom: 2px solid @border-color;
    font-size: 16px;
    line-height: @operating-area-height;
    text-align: left;
    place-content: center space-between;

    a {
      margin: 0 5px;
      color: #666;

      &.disabled,
      &.disabled:hover {
        color: #ccc;
      }

      &:hover {
        color: @primary-color;
      }

      > span {
        padding-left: 2px;
        font-size: 14px;
      }
    }
  }
</style>
