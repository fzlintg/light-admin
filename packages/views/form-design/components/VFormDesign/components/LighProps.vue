<template>
  <Form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
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
  import { useAttrs } from '@vben/hooks';
  import { componentMap } from '../../../core/formItemConfig';

  import {
    //  defineProps,
    defineEmits,
    computed,
    onMounted,
    ref,
    reactive,
    watch,
    toRaw,
    unref,
  } from 'vue';
  import { useFormValues } from '../../../../../components/Form/src/hooks/useFormValues';
  import { useRuleFormItem } from '../../../../../myhooks/component/useFormItem';
  import { forOwn, get, set, cloneDeep } from 'lodash-es';
  import { getInitValue } from '../../../utils/index';

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
  // const emit = defineEmits(['update:props']);
  const [formState] = useRuleFormItem(props, 'props', 'update:props');
  onMounted(() => {
    const formData = {};
    getInitValue(props.schema, formData);
    // // formState.value = cloneDeep(formData);
    // formState.value.min = formData.min;
    // formState.value.max = formData.max;
    // formState.value.defaultValue = formData.defaultValue;
    // formState.value.step = formData.step;
    // // formState.value.tooltipPlacement = formData.tooltipPlacement;

    for (const item in formData) {
      formState.value[item] = formData[item];
    }
  });

  // Object.assign(formState.value, formData); //初始化
  //const attrs = useAttrs();

  // const getProps = computed(() => {
  //   return { ...unref(attrs) };
  // });
  // const getSchema = computed(() => {
  //   return unref(attrs).schema;
  // });
  // const formModel = reactive({});
  // const toRawUnref = (value) => toRaw(unref(value));
  // const defaultValueRef = ref({});
  // const { initDefault } = useFormValues({
  //   getProps,
  //   defaultValueRef,
  //   getSchema,
  //   formModel,
  // });

  // const emit = defineEmits(['update:props']);
  // onMounted(() => {
  //   initDefault();
  //   // for (const item in formModel) {
  //   //   formModel[item] = toRawUnref(attrs).props.defaultValue || formModel[item];
  //   // }
  //   watch(
  //     () => formModel,
  //     () => {
  //       let formValue = {};
  //       for (const item in formModel) {
  //         set(formValue, item, formModel[item]);
  //       }
  //       attrs.value.props = { ...unref(attrs).props, ...formValue };
  //       emit('update:props', formValue);
  //     },
  //     {
  //       deep: true,
  //       immediate: true,
  //     },
  //   );
  // });

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
