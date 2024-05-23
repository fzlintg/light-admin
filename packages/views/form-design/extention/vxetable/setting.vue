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
  import { formatRules } from '../../utils/index';
  import { ref } from 'vue';
  import action from '../../json/vxetable.action.ts';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { tplOptions, optionsMap, schemaMap, actionsMap } from './loader';
  import { cloneDeep } from 'lodash-es';

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
  const formShow = ref(false);
  const fApi = ref();
  const formConfig = ref(action);
  formatRules(formConfig.value.schemas, true);
  const loadTpl = () => {
    formState.value.componentProps.gridOptions = cloneDeep(
      optionsMap[formState.value.componentProps.tpl],
    );
    if (actionsMap[formState.value.componentProps.tpl])
      formState.value.componentProps.actions = cloneDeep(
        actionsMap[formState.value.componentProps.tpl],
      );
    //   formatRules([formState.value], true);
  };
  formShow.value = true;
</script>
