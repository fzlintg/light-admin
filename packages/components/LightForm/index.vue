<template>
  <VFormCreate
    :form-config="formConfig"
    v-model:fApi="fApi"
    v-model:formModel="formModel"
    ref="vformRef"
    @submit="onSubmit"
  />
</template>
<script setup>
  import { cloneDeep } from 'lodash-es';
  import VFormCreate from '@views/form-design/components/VFormCreate/index.vue';
  import logicJson from '@/loader.ts';
  //import { onMounted } from 'vue';
  import { formatRules } from '@views/form-design/utils/index.ts';

  const props = defineProps({
    logic: {
      type: String,
      default: '',
    },
  });
  const formConfig = ref(null),
    fApi = ref(null),
    formModel = ref({}),
    vformRef = ref(null);
  const onSubmit = () => {};
  const jsonData = cloneDeep(logicJson[props.logic]);
  formatRules(jsonData.schemas);
  formConfig.value = jsonData;
  defineExpose({ vformRef, getFormRef: () => vformRef.value });
</script>
