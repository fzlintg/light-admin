<template>
  <div class="grid-box">
    <div class="sub-form-table">
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
            :style="{ width: element.width }"
            class="drag-move sub-form-table-column"
            :schema="element"
            :current-item="currentItem"
            parentComp="SubForm"
            @handle-copy="$emit('handle-copy')"
            @handle-delete="$emit('handle-delete')"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useFormDesignState } from '../../hooks/useFormDesignState';
  //import { Form as AForm } from 'ant-design-vue';
  import draggable from 'vuedraggable';
  //import LayoutItem from '@views/form-design/components/VFormDesign/components/LayoutItem.vue';
  import FormNode from '../../components/VFormDesign/components/FormNode.vue';
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

  .sub-form-table {
    min-height: 120px;
  }

  .sub-form-table-column {
    display: inline-block;
    vertical-align: top;
  }
</style>
