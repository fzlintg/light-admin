<template>
  <VFormCreate :form-config="formConfig as any" v-model:fApi="fApi" v-model:formModel="formModel" />
</template>
<script lang="ts" setup>
  import { formatRules } from '../utils/index';
  import VFormCreate from '../components/VFormCreate/index.vue';
  import formConfig from './qrtest.json';

  formatRules(formConfig.schemas);
  const fApi = reactive({});
  const formModel = ref({});
</script>
