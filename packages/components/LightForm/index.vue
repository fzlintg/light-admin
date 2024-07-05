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

  import { formatRules } from '@views/form-design/utils/index.ts';
  import { onMounted } from 'vue';
  import { defHttp as axios } from '@utils/http/axios';

  const props = defineProps({
    logic: {
      type: String,
      default: '',
    },
    remote: {
      type: Boolean,
      default: false,
    },
  });
  const formConfig = ref(null),
    fApi = ref(null),
    formModel = ref({}),
    vformRef = ref(null);
  const onSubmit = () => {};
  onMounted(() => {
    let jsonData;
    // if(props.remote){
    //   jsonData=await axios.post({url:"/api/logic/getLogicData/system.toolbar.setting"});
    // }
    // else
    jsonData = cloneDeep(logicJson[props.logic]);
    formatRules(jsonData.schemas);
    formConfig.value = jsonData;
  });

  defineExpose({ vformRef, getFormRef: () => vformRef.value });
</script>
