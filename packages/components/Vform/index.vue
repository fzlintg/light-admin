<template>
    <VFormCreate
      :form-config="formConfig"
      v-model:fApi="fApi"
      v-model:formModel="formModel"
      @submit="onSubmit"
    ></VFormCreate>
</template>
<script setup>
  import { cloneDeep } from 'lodash-es';
import VFormCreate from '../views/form-design/components/VFormCreate';
  const props=defineProps({
    logic: {
      type: String,
      default: "",
    },
  })
  const formConfig=ref(null),fApi=ref(null),formModel=ref({});
  const onSubmit=()=>{

  }
const modules = import.meta.glob("@/json/"+props.logic+".ts", { eager: true });


</script>