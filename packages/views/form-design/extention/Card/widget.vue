<template>
  <div
    class="grid-box"
    :class="{ active: schema.key === currentItem.key }"
    @click.stop="handleSetSelectItem(schema)"
  >
    <card v-bind="schema.componentProps">
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
    </card>
    <FormNodeOperate :schema="schema" :currentItem="currentItem" />
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
  const { currentItem, schema } = useAttrs();
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
