<template>
  <div class="grid-box">
    <draggable
      class="list-main draggable-box d-flex ant-row"
      style="flex-wrap: wrap; align-content: flex-start"
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
        <FormNode
          class="drag-move"
          :schema="element"
          :current-item="currentItem"
          @handle-copy="$emit('handle-copy')"
          @handle-delete="$emit('handle-delete')"
        />
      </template>
    </draggable>
  </div>
</template>
<script lang="ts" setup>
  import { useFormDesignState } from '../../hooks/useFormDesignState';

  import draggable from 'vuedraggable';
  // import LayoutItem from '@views/form-design/components/VFormDesign/components/LayoutItem.vue';
  import FormNode from '../../components/VFormDesign/components/FormNode.vue';
  import { getAttrs } from '../../utils';

  const emit = defineEmits(['dragStart', 'handleColAdd', 'handle-copy', 'handle-delete']);
  const {
    formDesignMethods: { handleSetSelectItem },
    // formConfig,
  } = useFormDesignState();

  const { currentItem, schema } = getAttrs();
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
