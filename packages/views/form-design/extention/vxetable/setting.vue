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
  import { computed, ref, unref, watch } from 'vue';
  import action from '../../json/vxetable.action.ts';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { tplOptions, optionsMap, schemaMap } from './loader';
  import { cloneDeep, merge, isEmpty } from 'lodash-es';

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
  formatRules(formConfig.value.schemas, true);
  const initState = () => {
    // if (isEmpty(formType.value) && formState.value.componentProps.tpl)
    //   formState.value.componentProps.chartTpl = unref(cloneDeep(optionsMap[formType.value]));
    // initSetting(formType.value);
    merge(formState.value, schemaMap[formType.value]);
    formatFunc(formState.value.componentProps);
  };
  const loadTpl = () => {
    formState.value.componentProps.gridOptions = cloneDeep(
      optionsMap[formState.value.componentProps.tpl],
    );
    initState();
    // if (customMap[formState.value.componentProps.tpl])
    //   formState.value.componentProps.actions = cloneDeep(
    //     customMap[formState.value.componentProps.tpl].actions,
    //   );
  };
  watch(
    () => formState.value.componentProps.gridVar__func,
    () => {
      formatFunc(formState.value.componentProps);
    },
  );

  formShow.value = true;
</script>
