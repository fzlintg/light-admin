<template>
  <light-form logic="system.loadLogic" :formModel="state" @update:form-model="updateFormModel" />
  <Button @click="loadForm">确定</Button>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { Button } from 'ant-design-vue';
  //import { cloneDeep } from 'lodash-es';
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
  });

  const [formState] = useRuleFormItem(props, 'props', 'update:props');

  const state = ref({ name: formState.value.componentProps.logic });
  const updateFormModel = (value) => {
    Object.assign(state.value, value);
  };
  const loadForm = () => {
    console.log(formState.value);
    formState.value.componentProps.logic = state.value.name;

    //Object.assign(formState.value.componentProps, state.value);
  };
  onMounted(() => {});
</script>
