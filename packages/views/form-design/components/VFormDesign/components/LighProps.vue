<template>
  <FormItem :label="item.label" v-for="item in getSchema" :key="item.name">
    <!--     处理数组属性，placeholder       -->
    <div v-if="item.children">
      <template v-for="(child, index) of item.children" :key="index">
        <component
          v-if="child.component"
          v-bind="child.componentProps"
          v-model:value="formModel[item.name][index]"
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
      v-model:value="formModel[item.name]"
    />
    <Divider class="divider_title" dashed v-else-if="item.component == 'Divider'">{{
      item.componentProps.label
    }}</Divider>
  </FormItem>
</template>
<script lang="ts" setup>
  import { FormItem, Divider } from 'ant-design-vue';
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
  import { get, set } from 'lodash-es';

  const attrs = useAttrs();
  const getProps = computed(() => {
    return { ...unref(attrs) };
  });
  const getSchema = computed(() => {
    return unref(attrs).schema;
  });
  const formModel = reactive({});
  const toRawUnref = (value) => toRaw(unref(value));
  const defaultValueRef = ref({});
  const { initDefault } = useFormValues({
    getProps,
    defaultValueRef,
    getSchema,
    formModel,
  });
  const emit = defineEmits(['update:props']);
  onMounted(() => {
    initDefault();
    for (const item in formModel) {
      formModel[item] = get(toRawUnref(attrs).props, item);
    }
  });
  watch(
    () => formModel,
    () => {
      let formValue = {};
      for (const item in formModel) {
        set(formValue, item, formModel[item]);
      }
      attrs.value.props = { ...unref(attrs).props, ...formValue };
      emit('update:props', attrs.value.props);
    },
    {
      deep: true,
      immediate: true,
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
