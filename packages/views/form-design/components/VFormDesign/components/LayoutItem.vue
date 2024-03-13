<!--
 * @Description: 表单项布局控件
 * 千万不要在template下面的第一行加注释，因为这里拖动的第一个元素
-->

<template>
  <Col v-bind="colPropsComputed">


    <FormNode

      :key="schema.key"
      :schema="schema"
      :current-item="currentItem"
      @handle-copy="$emit('handle-copy')"
      @handle-delete="$emit('handle-delete')"
    />
  </Col>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType, reactive, toRefs } from 'vue';
  import draggable from 'vuedraggable';
  import FormNode from './FormNode.vue';
  import FormNodeOperate from './FormNodeOperate.vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import { IVFormComponent } from '../../../typings/v-form-component';
  import { Row, Col, Tabs, TabPane, Card } from 'ant-design-vue';


  export default defineComponent({
    name: 'LayoutItem',
    components: {
      FormNode,
      FormNodeOperate,
      draggable,
      Row,
      Col,
      Tabs,
      TabPane,
      Card,
    },
    props: {
      schema: {
        type: Object as PropType<IVFormComponent>,
        required: true,
      },
      currentItem: {
        type: Object,
        required: true,
      },
    },
    emits: ['dragStart', 'handleColAdd', 'handle-copy', 'handle-delete'],
    setup(props) {
      const {
        formDesignMethods: { handleSetSelectItem },
        formConfig,
      } = useFormDesignState();
      const state = reactive({});
      const colPropsComputed = computed(() => {
        const { colProps = {} } = props.schema;
        return colProps;
      });

      const list1 = computed(() => props.schema.columns);

      // 计算布局元素，水平模式下为ACol，非水平模式下为div
      const layoutTag = computed(() => {
        return formConfig.value.layout === 'horizontal' ? 'Col' : 'div';
      });

      return {
        ...toRefs(state),
        colPropsComputed,
        handleSetSelectItem,
        layoutTag,
        list1,
     //   widget,
      };
    },
  });
</script>
<style lang="less">
  @import url('../styles/variable.less');

  .layout-width {
    width: 100%;
  }

  .hidden-item {
    background-color: rgb(240 191 195);
  }
</style>
