<template>
  <VFormCreate :form-config="formConfig as any" v-model:fApi="fApi" v-model:formModel="formState" />
</template>
<script lang="ts" setup>
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import { formatRules } from '../../utils/index';
  import { ref } from 'vue';
  import dropmenu from '../../json/dropdown.children.ts';
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
  // const formModel = toRefs(useAttrs());
  const formConfig = ref(dropmenu);
  formatRules(formConfig.value.schemas);
  //onMounted(() => {});
</script>
