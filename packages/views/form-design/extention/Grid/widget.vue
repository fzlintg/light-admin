<template>
  <div class="grid-box">
    <Row class="grid-row" v-bind="schema.componentProps">
      <Col
        class="grid-col"
        v-for="(colItem, index) in schema.columns"
        :key="index"
        :span="colItem.span"
      >
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
          v-model="colItem.children"
          @start="$emit('dragStart', $event, colItem.children)"
          @add="$emit('handleColAdd', $event, colItem.children)"
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
      </Col>
    </Row>
  </div>
</template>
<script lang="ts" setup>
  import { useFormDesignState } from '../../hooks/useFormDesignState';
  import { Row, Col } from 'ant-design-vue';
  import { defineAsyncComponent } from 'vue';
  import draggable from 'vuedraggable';
  // import LayoutItem from '@views/form-design/components/VFormDesign/components/LayoutItem.vue';
  const LayoutItem = defineAsyncComponent(
    () => import('@views/form-design/components/VFormDesign/components/LayoutItem.vue'),
  );
  //const emit = defineEmits(['dragStart', 'handleColAdd', 'handle-copy', 'handle-delete']);
  const {
    formDesignMethods: { handleSetSelectItem },
    // formConfig,
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
