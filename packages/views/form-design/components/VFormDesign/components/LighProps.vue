<template>
  <Form :model="formState" layout="vertical">
    <FormItem v-if="!!props.hideSetting.options" label="组件类型" class="mt-2">
      <a-radio-group button-style="solid" v-model:value="props.props.hideSet">
        <a-radio-button v-for="item in props.hideSetting.options" :value="item.value">{{
          item.label
        }}</a-radio-button>
      </a-radio-group>
    </FormItem>
    <FormItem :label="item.label" v-for="item in propsSchema" :key="item.field">
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
  import {
    Form,
    FormItem,
    Divider,
    RadioGroup as ARadioGroup,
    RadioButton as ARadioButton,
  } from 'ant-design-vue';
  import { componentMap } from '../../../core/formItemConfig';
  import { computed, watch } from 'vue';
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
    hideSetting: {
      type: Object,
      default: () => ({}),
    },
  });

  const [formState] = useRuleFormItem(props, 'props', 'update:props');
  const propsSchema = computed(() => {
    return props.schema.filter((item) => showItem(item.field));
  });
  const showItem = (comp) => {
    //  if (!props?.hideSetting?.setting) return true;
    if (props?.hideSetting?.setting?.[props.props.hideSet]?.includes(comp)) return false;
    return true;
  };
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
