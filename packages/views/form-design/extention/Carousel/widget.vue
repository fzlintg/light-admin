<template>
  <div class="grid-box">
    <carousel
      v-bind="schema.componentProps"
      :style="{
        background: schema.componentProps.background,
        minHeight: schema.componentProps.height,
      }"
    >
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
          <FormNode
            class="drag-move"
            :schema="element"
            :current-item="currentItem"
            @handle-copy="$emit('handle-copy')"
            @handle-delete="$emit('handle-delete')"
          />
        </template>
      </draggable>
    </carousel>
  </div>
</template>
<script lang="ts" setup>
  //import FormNodeOperate from '../../components/VFormDesign/components/FormNodeOperate.vue';
  import { useFormDesignState } from '../../hooks/useFormDesignState';
  import { Carousel } from 'ant-design-vue';
  import draggable from 'vuedraggable';
  // import LayoutItem from '@views/form-design/components/VFormDesign/components/LayoutItem.vue';
  import FormNode from '../../components/VFormDesign/components/FormNode.vue';
  import { getAttrs } from '../../utils';
  // const emit = defineEmits(['dragStart', 'handleColAdd', 'handle-copy', 'handle-delete']);
  const {
    formDesignMethods: { handleSetSelectItem },
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
