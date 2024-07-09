<!--
 * @Description: 表单项属性，控件属性面板
-->
<template>
  <div class="properties-content mx-2">
    <div class="properties-body" v-if="formConfig.currentItem?.itemProps">
      <Empty class="hint-box" v-if="!formConfig.currentItem.key" description="未选择控件" />
      <Form v-else label-align="left" layout="vertical">
        <div v-for="item of baseFormItemProps" :key="item.field">
          <FormItem :label="item.label" v-if="showProps(item.exclude)">
            <component
              v-if="item.component"
              class="component-props"
              v-bind="item.componentProps"
              :is="item.component"
              v-model:value="formConfig.currentItem[item.field]"
            />
          </FormItem>
        </div>
        <div v-for="item of advanceFormItemProps" :key="item.field">
          <FormItem :label="item.label" v-if="showProps(item.exclude)">
            <component
              v-if="item.component"
              class="component-props"
              v-bind="item.componentProps"
              :is="item.component"
              v-model:value="formConfig.currentItem.itemProps[item.field]"
            />
          </FormItem> </div
        ><div v-for="item of advanceFormItemColProps" :key="item.field">
          <FormItem :label="item.label" v-if="showProps(item.exclude)">
            <component
              v-if="item.component"
              class="component-props"
              v-bind="item.componentProps"
              :is="item.component"
              v-model:value="formConfig.currentItem.itemProps[item.field]['span']"
            />
          </FormItem>
        </div>
        <FormItem label="组件对齐" v-if="formConfig.currentItem.type === 'showItem'">
          <RadioGroup button-style="solid" v-model:value="formConfig.currentItem.compAlign">
            <RadioButton value="center">居中</RadioButton>
            <RadioButton value="start">靠左</RadioButton>
            <RadioButton value="end">靠右</RadioButton>
          </RadioGroup>
        </FormItem>
        <FormItem label="控制属性" v-if="controlPropsList.length">
          <Col v-for="item of controlPropsList" :key="item.field">
            <Checkbox v-model:checked="formConfig.currentItem.itemProps[item.field]">
              {{ item.label }}
            </Checkbox>
          </Col>
        </FormItem>
        <FormItem label="是否必选" v-if="!['Grid'].includes(formConfig.currentItem.component)">
          <Switch v-model:checked="formConfig.currentItem.itemProps['required']" />
          <Input
            v-if="formConfig.currentItem.itemProps['required']"
            v-model:value="formConfig.currentItem.itemProps['message']"
            placeholder="请输入必选提示"
          />
        </FormItem>
        <FormItem
          v-if="!['Grid'].includes(formConfig.currentItem.component)"
          label="校验规则"
          :class="{ 'form-rule-props': !!formConfig.currentItem.itemProps['rules'] }"
        >
          <RuleProps />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script lang="ts" setup name="FormItemProps">
  import { computed, watch } from 'vue';
  import {
    baseFormItemControlAttrs,
    baseFormItemProps,
    advanceFormItemProps,
    advanceFormItemColProps,
  } from '../../VFormDesign/config/formItemPropsConfig';

  import {
    RadioGroup,
    RadioButton,
    Empty,
    Input,
    Form,
    FormItem,
    Switch,
    Checkbox,
    Col,
  } from 'ant-design-vue';
  import RuleProps from './RuleProps.vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import { isArray } from 'lodash-es';

  const { formConfig } = useFormDesignState();

  watch(
    () => formConfig.value,
    () => {
      if (formConfig.value.currentItem) {
        formConfig.value.currentItem.itemProps = formConfig.value.currentItem.itemProps || {};
        formConfig.value.currentItem.itemProps.labelCol =
          formConfig.value.currentItem.itemProps.labelCol || {};
        formConfig.value.currentItem.itemProps.wrapperCol =
          formConfig.value.currentItem.itemProps.wrapperCol || {};
        // formConfig.value.currentItem.width = formConfig.value.currentItem.width || '300px';
      }
    },
    { deep: true, immediate: true },
  );
  const showProps = (exclude: string[] | undefined) => {
    if (!exclude) {
      return true;
    }
    return isArray(exclude) ? !exclude.includes(formConfig.value.currentItem!.component) : true;
  };

  const controlPropsList = computed(() => {
    return baseFormItemControlAttrs.filter((item) => {
      return showProps(item.exclude);
    });
  });
</script>
