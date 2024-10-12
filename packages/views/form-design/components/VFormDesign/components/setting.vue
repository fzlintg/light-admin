<template>
  <light-form :logic="props.logic" :formModel="formModel" @update:form-model="updateFormModel" />
</template>
<script lang="ts" setup>
  import { onMounted, watch, ref } from 'vue';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { flattenObject, formModelToData } from '../../../utils';
  import { cloneDeep } from 'lodash-es';

  //import { mergeSchema } from './schema.ts';

  const props = defineProps({
    schema: {
      type: Object,
      default: () => ({}),
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    logic: {
      type: String || null,
      default: null,
    },
  });

  const [formState] = useRuleFormItem(props, 'props', 'update:props');
  const formModel = ref(cloneDeep(flattenObject(formState.value)));

  watch(
    () => formState.value,
    () => {
      formModel.value = cloneDeep(flattenObject(formState.value));
    },
  );
  watch(
    () => formModel.value,
    () => {
      let formData = formModelToData(formModel.value);
      Object.assign(formState.value, formData);
    },
    { deep: true },
  );

  // watch(()=>props.props,()=>{

  // })
  // watchEffect(() => {
  //   let formData = formModelToData(formModel.value);
  //   Object.assign(formState.value, formData);
  // });
  // const updateFormModel = (value) => {
  //   debugger;
  //   console.log(value);
  //   let formData = formModelToData(value);
  //   Object.assign(formState.value.componentProps, formData);
  // };
  onMounted(() => {});
</script>
