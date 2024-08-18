<!--
 * @Description: 表单项属性
-->
<template>
  <div class="properties-content mx-2">
    <div class="properties-body" v-if="formConfig.currentItem">
      <Empty class="hint-box" v-if="!formConfig.currentItem.key" description="未选择控件" />
      <Form v-else label-align="left" layout="vertical">
        <FormItem :label="firstComp.label" class="mb-0">
          <component
            v-if="formConfig.currentItem.colProps && firstComp.component"
            class="component-props"
            v-bind="firstComp.componentProps"
            :is="firstComp.component"
            v-model:value="formConfig.currentItem.colProps[firstComp.field]"
          />
        </FormItem>
        <CollapseContainer title="其他栅格" :show="false">
          <div v-for="item of otherComp" :key="item.field">
            <FormItem :label="item.label" v-if="showProps(item.exclude)">
              <component
                v-if="formConfig.currentItem.colProps && item.component"
                class="component-props"
                v-bind="item.componentProps"
                :is="item.component"
                v-model:value="formConfig.currentItem.colProps[item.field]"
              />
            </FormItem>
          </div>
        </CollapseContainer>
      </Form>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { baseItemColumnProps } from '../config/formItemPropsConfig';

  import { Empty, Input, Form, FormItem, Switch, Checkbox, Select, Slider } from 'ant-design-vue';
  import RuleProps from './RuleProps.vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import { isArray } from 'lodash-es';
  import { CollapseContainer } from '@c/Container';

  export default defineComponent({
    name: 'FormItemProps',
    components: {
      RuleProps,
      Empty,
      Input,
      Form,
      FormItem,
      Switch,
      Checkbox,
      Select,
      Slider,
      CollapseContainer,
    },
    // props: {} as PropsOptions,

    setup() {
      const { formConfig } = useFormDesignState();
      const firstComp = computed(() => {
        return baseItemColumnProps?.[0];
      });
      const otherComp = computed(() => {
        return baseItemColumnProps.slice(1);
      });
      const showProps = (exclude: string[] | undefined) => {
        if (!exclude) {
          return true;
        }

        return isArray(exclude) ? !exclude.includes(formConfig.value.currentItem!.component) : true;
      };
      return {
        baseItemColumnProps,
        formConfig,
        showProps,
        firstComp,
        otherComp,
      };
    },
  });
</script>
