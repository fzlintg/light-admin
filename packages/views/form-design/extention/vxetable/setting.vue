<template>
  <a-form-item label="表格模版"
    ><div class="d-flex">
      <Select
        :options="tplOptions"
        v-model:value="formState.componentProps.tpl"
        class="flex-1"
      /><Button @click="loadTpl">加载</Button>
    </div>
  </a-form-item>

  <VFormCreate
    :form-config="formConfig"
    v-model:fApi="fApi"
    v-model:formModel="formState.componentProps"
    v-if="formShow"
  />
</template>
<script lang="ts" setup>
  import { Button, Select, FormItem as AFormItem } from 'ant-design-vue';
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import { formatFunc, formatRules } from '../../utils/index';
  import { computed, ref, unref, watch, nextTick } from 'vue';
  import action from '../../json/vxetable.action.ts';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { tplOptions, optionsMap, schemaMap } from './loader';
  import { cloneDeep, merge, isEmpty } from 'lodash-es';
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
  const formType = computed(() => formState.value.componentProps.tpl);
  const formShow = ref(false);
  const fApi = ref();
  const formConfig = ref(action);
  onMounted(() => {
    formatRules(formConfig.value.schemas, true);
    formShow.value = true;
  });

  // const initState = () => {
  //   // if (isEmpty(formType.value) && formState.value.componentProps.tpl)
  //   //   formState.value.componentProps.chartTpl = unref(cloneDeep(optionsMap[formType.value]));
  //   // initSetting(formType.value);

  // };
  const loadTpl = () => {
    // formState.value = mergeSchema(
    //   optionsMap[formType.value],
    //   schemaMap[formType.value],
    //   formType.value,
    // );
    //  formShow.value = false;
    const gridOptions = cloneDeep(optionsMap[formType.value]);
    formState.value.componentProps = {
      height: '600px',
      gridVar__func: '',
      tpl: formType.value,
      gridOptions,
    };
    // formState.value.componentProps.gridOptions = cloneDeep(optionsMap[formType.value]);
    merge(formState.value, schemaMap[formType.value]);
    formatFunc(formState.value.componentProps);

    // initState();
    // if (customMap[formState.value.componentProps.tpl])
    //   formState.value.componentProps.actions = cloneDeep(
    //     customMap[formState.value.componentProps.tpl].actions,
    //   );
    // nextTick(() => {
    //   formShow.value = true;
    // });
    // emit('update:props', formState.value);
  };
  watch(
    () => formState.value.componentProps.gridVar__func,
    () => {
      formatFunc(formState.value.componentProps);
    },
  );
</script>
