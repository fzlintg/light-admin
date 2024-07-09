<!--
 * @Description: 中间表单布局面板
 * https://github.com/SortableJS/vue.draggable.next/issues/138
-->
<template>
  <div class="form-panel v-form-container">
    <Empty
      class="empty-text"
      v-show="formConfig.schemas.length === 0"
      description="从左侧选择控件添加"
    />
    <Form v-bind="formConfig">
      <div class="draggable-box">
        <draggable
          class="ant-row d-flex list-main"
          style="flex-wrap: wrap"
          group="form-draggable"
          :component-data="{ name: 'list', tag: 'div', type: 'transition-group' }"
          ghostClass="moving"
          :animation="180"
          handle=".drag-move"
          v-model="formConfig.schemas"
          item-key="key"
          :move="handleCheck"
          @add="addItem"
          @start="handleDragStart"
        >
          <template #item="{ element }">
            <FormNode
              class="drag-move"
              :schema="element"
              :data="formConfig"
              :parent-comp="''"
              :current-item="formConfig.currentItem || {}"
            />
          </template>
        </draggable>
      </div>
    </Form>
  </div>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  //import LayoutItem from '../components/LayoutItem.vue';
  import FormNode from '../components/FormNode.vue';
  import { defineComponent, computed } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import { Form, Empty, Row } from 'ant-design-vue';

  export default defineComponent({
    name: 'FormComponentPanel',
    components: {
      //    LayoutItem,
      FormNode,
      draggable,
      Form,
      Row,
      Empty,
    },
    emits: ['handleSetSelectItem'],
    setup(_, { emit }) {
      const { formConfig } = useFormDesignState();

      /**
       * 拖拽完成事件
       * @param newIndex
       */
      const addItem = ({ newIndex }: any) => {
        formConfig.value.schemas = formConfig.value.schemas || [];

        const schemas = formConfig.value.schemas;
        schemas[newIndex] = cloneDeep(schemas[newIndex]);
        emit('handleSetSelectItem', schemas[newIndex]);
      };

      /**
       * 拖拽开始事件
       * @param e {Object} 事件对象
       */
      const handleDragStart = (e: any) => {
        emit('handleSetSelectItem', formConfig.value.schemas[e.oldIndex]);
      };

      // 获取祖先组件传递的currentItem

      // 计算布局元素，水平模式下为ACol，非水平模式下为div
      const layoutTag = computed(() => {
        return formConfig.value.layout === 'horizontal' ? 'Col' : 'div';
      });
      const handleCheck = (evt) => {
        if (!!evt.draggedContext && !!evt.draggedContext.element) {
          let { component } = evt.draggedContext.element;
          if (evt.to) {
            if (
              evt.to.className != 'list-main ant-row' &&
              (component == 'Modal' || component == 'Drawer')
            )
              return false;
          }
        }
        return true;
      };
      return {
        addItem,
        handleDragStart,
        formConfig,
        layoutTag,
        handleCheck,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import url('../styles/variable.less');
  @import url('../styles/drag.less');

  .v-form-container {
    // 内联布局样式
    .ant-form-inline {
      .list-main {
        display: flex;
        flex-wrap: wrap;
        place-content: flex-start;

        .layout-width {
          width: 100%;
        }
      }

      .ant-form-item-control-wrapper {
        min-width: 175px !important;
      }
    }
  }

  .form-panel {
    position: relative;

    .empty-text {
      position: absolute;
      z-index: 100;
      inset: -10% 0 0;
      height: 150px;
      margin: auto;
      color: #aaa;
    }

    .draggable-box {
      // height: calc(100vh - 120px);
      // // width: 100%;
      // overflow: auto;

      .drag-move {
        min-height: 62px;
        cursor: move;
      }

      .list-main {
        // 列表动画

        height: calc(100vh - 120px);
        overflow: auto;

        .list-enter-active {
          transition: all 0.5s;
        }

        .list-leave-active {
          transition: all 0.3s;
        }

        .list-enter,
        .list-leave-to {
          transform: translateX(-100px);
          opacity: 0;
        }

        .list-enter {
          height: 30px;
        }
      }
    }
  }
</style>
