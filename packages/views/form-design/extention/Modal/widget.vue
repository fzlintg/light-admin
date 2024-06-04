<template>
  <div class="grid-box">
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
      :move="handleCheck"
      @add="$emit('handleColAdd', event, schema.children)"
    >
      <template #item="{ element }">
        <FormNode
          class="drag-move"
          :schema="element"
          @handle-copy="$emit('handle-copy')"
          @handle-delete="$emit('handle-delete')"
        />
      </template>
    </draggable>
  </div>
</template>
<script lang="ts" setup>
  // import { getCurrentInstance, onMounted } from 'vue';
  //import { useFormDesignState } from '../../hooks/useFormDesignState';
  import draggable from 'vuedraggable';
  //  import LayoutItem from '@views/form-design/components/VFormDesign/components/LayoutItem.vue';
  const FormNode = defineAsyncComponent(
    () => import('../../components/VFormDesign/components/FormNode.vue'),
  );
  //const emit =
  defineEmits(['dragStart', 'handleColAdd', 'handle-copy', 'handle-delete']);
  // const {
  //   formDesignMethods: { handleSetSelectItem },
  //   // formConfig,
  // } = useFormDesignState();

  //const { formConfig } = toRefs(useAttrs());
  // const formConfigNew = computed(() => {
  //   return { ...formConfig.value, schemas: toRaw(schema.value.children) };
  // });
  const { schema } = toRefs(useAttrs());

  // const { proxy } = getCurrentInstance();
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
