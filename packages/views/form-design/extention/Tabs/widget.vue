<template>
<div class="grid-box" >
    <tabs>
      <tab-pane v-for="(tabItem, index) in schema.columns" :key="index" :tab="tabItem.label">
        <draggable
          class="list-main draggable-box"
          :component-data="{ name: 'list', tag: 'div', type: 'transition-group' }"
          v-bind="{
            group: 'form-draggable',
            ghostClass: 'moving',
            animation: 180,
            handle: '.drag-move',
          }"
          item-key="key"
          v-model="tabItem.children"
          @start="$emit('dragStart', $event, tabItem.children)"
          @add="$emit('handleColAdd', $event, tabItem.children)"
        >
          <template #item="{ element }">
            <LayoutItem
              class="drag-move"
              :schema="element"
              :current-item="currentItem"
              @handle-copy="$emit('handle-copy')"
              @handle-delete="$emit('handle-delete')"
            />
          </template>
        </draggable>
      </tab-pane>
    </tabs>

  </div>
</template>
<script lang="ts" setup>
  import FormNodeOperate from '../../components/VFormDesign/components/FormNodeOperate.vue';
  import { useFormDesignState } from '../../hooks/useFormDesignState';
  import { Tabs, TabPane } from 'ant-design-vue';
  import draggable from 'vuedraggable';
  import LayoutItem from '@views/form-design/components/VFormDesign/components/LayoutItem.vue';

  // const emit = defineEmits(['dragStart', 'handleColAdd', 'handle-copy', 'handle-delete']);
  const {
    formDesignMethods: { handleSetSelectItem },
  } = useFormDesignState();
  const { currentItem, schema } = toRefs(useAttrs());
</script>
<style lang="less">
  @import url('../../../form-design/components/VFormDesign/styles/variable.less');

  .layout-width {
    width: 100%;
  }

  .hidden-item {
    background-color: rgb(240 191 195);
  }
</style>
