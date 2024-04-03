<template>
  <VFormCreate :form-config="formConfig as any" v-model:fApi="fApi" v-model:formModel="formModel" />
</template>
<script lang="ts" setup name="Example1">
  import { formatRules } from '../utils/index';
  import VFormCreate from '../components/VFormCreate/index.vue';
  import formConfig from './qrtest.json';

  // defineOptions({ name: 'Example1' });
  formatRules(formConfig.schemas);
  const fApi = reactive({});
  const formModel = ref({});
</script>
