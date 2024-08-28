<template>
  <div class="operating-area" :style="{ width: schema.width }">
    <div class="left-btn-box">
      <Tooltip v-for="item in schema.children" :title="item.title" :key="item.icon">
        <a @click="item.click" class="toolbar-text">
          <Icon :icon="item.icon" />
        </a> </Tooltip></div
  ></div>
</template>
<script setup lang="ts">
  import { Tooltip } from 'ant-design-vue';

  const { schema } = toRefs(useAttrs());
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
