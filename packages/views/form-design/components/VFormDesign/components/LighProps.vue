<template>
  <Form :model="formState" layout="vertical">
    <FormItem :label="item.label" v-for="item in props.schema" :key="item.field">
      <!--     处理数组属性，placeholder       -->
      <div v-if="item.children">
        <template v-for="(child, index) of item.children" :key="index">
          <component
            v-if="child.component"
            v-bind="child.componentProps"
            v-model:value="formState[item.field][index]"
            :is="getComponent(child.component)"
          />
        </template>
      </div>
      <!--     如果不是数组，则正常处理属性值       -->
      <component
        v-else-if="item.component && item.component != 'Divider'"
        class="component-prop"
        v-bind="item.componentProps"
        :is="getComponent(item.component)"
        v-model:value="formState[item.field]"
      />
      <Divider class="divider_title" dashed v-else-if="item.component == 'Divider'">{{
        item.componentProps.label
      }}</Divider>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
  import { Form, FormItem, Divider } from 'ant-design-vue';
  import { componentMap } from '../../../core/formItemConfig';
  import { watchEffect, watch } from 'vue';
  import { useRuleFormItem } from '../../../../../myhooks/component/useFormItem';
  //import { getInitValue } from '../../../utils/index';

  const props = defineProps({
    schema: {
      type: Object,
      default: () => ({}),
    },
    props: {
      type: Object,
      default: () => ({}),
    },
  });

  const [formState] = useRuleFormItem(props, 'props', 'update:props');
  // watchEffect(() => {
  watch(
    () => props.schema,
    () => {
      props.schema.forEach((item) => {
        if (item.defaultValue && !formState.value[item.field])
          formState.value[item.field] = item.defaultValue;
      });
    },
  );

  const getComponent = (name) => {
    return componentMap.get(name) || name;
  };
</script>
<style scoped>
  .divider_title {
    border-color: #f00;
    font-weight: bold;
  }
</style>
