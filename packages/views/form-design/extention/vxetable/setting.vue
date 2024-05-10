<template>
  <VFormCreate
    :form-config="formConfig"
    v-model:fApi="fApi"
    v-model:formModel="formState.componentProps"
  />
</template>
<script lang="ts" setup>
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import { formatRules } from '../../utils/index';
  import { ref } from 'vue';
  import action from '../../json/vxetable.action.ts';
  import { useRuleFormItem } from '@h/component/useFormItem';

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

  const fApi = ref();
  const formConfig = ref(action);
  formatRules(formConfig.value.schemas, {}, true);
</script>
