<!--
 * @Description: 右侧属性配置面板
-->
<template>
  <Tabs v-model:activeKey="formConfig.activeKey" :tabBarStyle="{ 'margin-left': '10px' }">
    <TabPane :key="3" tab="控件">
      <ComponentColumnProps />
      <FormItemProps />
    </TabPane>
    <TabPane :key="2" tab="组件">
    
      <ComponentProps />
    </TabPane>
    <TabPane :key="1" tab="表单">
      <FormProps />
    </TabPane>
  </Tabs>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import FormProps from '../components/FormProps.vue';
  import FormItemProps from '../components/FormItemProps.vue';
  import ComponentProps from '../components/ComponentProps.vue';
  import ComponentColumnProps from '../components/FormItemColumnProps.vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import { formItemConfig } from '../../../core/formItemConfig';
  import { TabPane, Tabs } from 'ant-design-vue';

  type ChangeTabKey = 1 | 2;
  export interface IPropsPanel {
    changeTab: (key: ChangeTabKey) => void;
  }
  export default defineComponent({
    name: 'PropsPanel',
    components: {
      FormProps,
      FormItemProps,
      ComponentProps,
      ComponentColumnProps,
      Tabs,
      TabPane,
    },
    setup() {
      const { formConfig } = useFormDesignState();

      // const customComponents = formItemConfig?.custom?.schema;

      // const slotProps = computed(() => {
      //   return customComponents?.find(
      //     (item) => item.component === formConfig.value.currentItem?.component,
      //   );
      // });
      return { formConfig };
    },
  });
</script>

<style lang="less" scoped>
  @import url('../styles/variable.less');

  .sidebar {
    height: calc(100vh - 78px);
    overflow: auto;
    overflow-x: hidden;
  }

  :deep(.ant-tabs) {
    box-sizing: border-box;

    form {
      width: 100%;
      height: 85vh;
      margin-right: 10px;
      overflow: hidden auto;
    }

    .hint-box {
      margin-top: 200px;
    }

    .ant-form-item,
    .ant-slider-with-marks {
      margin-right: 20px;
      margin-bottom: 0;
      margin-left: 10px;
    }

    .ant-form-item {
      // width: 100%;
      margin-bottom: 0;

      .ant-form-item-label {
        line-height: 2;
        vertical-align: text-top;
      }
    }

    .ant-input-number {
      width: 100%;
    }
  }
</style>
