<!--
 * @Description: 拖拽节点控件
-->
<template>
  <Col v-bind="colPropsComputed" style="width: 100% !important">
    <div
      class="drag-move-box"
      @click.stop="handleSelectItem"
      :class="{ active: schema.key === formConfig.currentItem?.key }"
    >
      <div class="form-item-box jc-start d-flex w100">
        <VFormItem
          :formConfig="formConfig"
          :schema="schema"
          :parentComp="parentComp"
          :current-item="formConfig.currentItem"
        />
      </div>
      <div class="show-key-box">
        {{ schema.label + (schema.field ? '/' + schema.field : '') }}
      </div>
      <FormNodeOperate :schema="schema" :currentItem="formConfig.currentItem" />
    </div>
  </Col>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, PropType, defineAsyncComponent } from 'vue';
  import { IVFormComponent } from '../../../typings/v-form-component';
  import FormNodeOperate from './FormNodeOperate.vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import { Col } from 'ant-design-vue';
  //import VFormItem from '../../VFormItem/index.vue';

  // import VFormItem from '../../VFormItem/vFormItem.vue';
  export default defineComponent({
    name: 'FormNode',
    components: {
      VFormItem: defineAsyncComponent(() => import('../../VFormItem/index.vue')),
      FormNodeOperate,
      Col,
    },
    props: {
      schema: {
        type: Object as PropType<IVFormComponent>,
        required: true,
      },
      parentComp: {
        type: String,
        default: () => {
          return '';
        },
      },
    },
    setup(props) {
      //  const VFormItem = ;
      const { formConfig, formDesignMethods } = useFormDesignState();
      const state = reactive({});
      // 获取 formDesignMethods
      const handleSelectItem = () => {
        // 调用 formDesignMethods
        // debugger;
        formDesignMethods.handleSetSelectItem(props.schema);
      };
      const colPropsComputed = computed(() => {
        const { colProps = {} } = props.schema;
        return props.parentComp == 'SubForm' ? {} : colProps; //lintg
      });
      // const colPropsComputed = computed(() => {
      //   const { colProps = {} } = props.schema;
      //   return props.parentComp == 'SubForm' ? {} : colProps; //lintg
      // });
      return {
        colPropsComputed,
        ...toRefs(state),
        handleSelectItem,
        formConfig,
        //  VFormItem,
      };
    },
  });
</script>
