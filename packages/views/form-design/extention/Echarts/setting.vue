<template>
  <div>
    图表类型<Select :options="chartOptions" v-model="chartType" />
    <Button @click="openEdit">点击编辑</Button>
    <VFormCreate :form-config="formConfig" @submit="updateChart" ref="vform" />
  </div>
</template>
<script lang="ts" setup>
  import { Button, Select } from 'ant-design-vue';
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import { formatRules } from '../../utils/index';
  import { ref, watchEffect } from 'vue';
  //import action from '../../json/vxetable.action.ts';
  import { settingMap, chartOptions } from './tpl/loader';
  import { useRuleFormItem } from '@h/component/useFormItem';

  // const props = defineProps({
  //   props: {
  //     type: Object,
  //     default: () => ({}),
  //   },
  // });
  debugger;
  const vform = ref(null),
    chartType = ref('lineBar');
  //const [formState] = useRuleFormItem(props, 'props', 'update:props');
  //const options;
  const openEdit = () => {
    vform.value.getFormItem('modal').getModal().show();
  };
  const formConfig = ref();
  watchEffect(() => {
    if (chartType.value) formConfig.value = settingMap[chartType.value];
    if (formConfig.value) formatRules(formConfig.value.schemas);
  });

  const updateChart = (options) => {
    debugger;
  };
</script>
