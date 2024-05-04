<template>
  <div class="grid-box">
    <CollapseContainer v-bind="schema.componentProps">
      <template #[key] v-for="(value, key) in schema.componentProps?.slots">
        {{ value }}
      </template>
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
        v-model="schema.children"
        @start="$emit('dragStart', $event, schema.children)"
        @add="$emit('handleColAdd', $event, schema.children)"
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
    </CollapseContainer>
  </div>
</template>
<script lang="ts" setup>
  import { useFormDesignState } from '../../hooks/useFormDesignState';

  import { CollapseContainer } from '@c/Container';
  import draggable from 'vuedraggable';
  import LayoutItem from '@views/form-design/components/VFormDesign/components/LayoutItem.vue';
  // import {Coll} from '@c/container/index.ts';
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
