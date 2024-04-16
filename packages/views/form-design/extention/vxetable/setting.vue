<template>
  <VFormCreate :form-config="formConfig as any" v-model:fApi="fApi" v-model:formModel="formModel" />
</template>
<script lang="ts" setup>
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import { formatRules } from '../../utils/index';
  import { onMounted, ref } from 'vue';
  import formConfig from '../../json/vxetable.action.json';

  const fApi = ref();
  const formModel = ref({});
  onMounted(() => {
    formatRules(formConfig.schemas);
  });
</script>
