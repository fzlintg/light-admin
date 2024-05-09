<template>
  <div>
    <a-form-item label="图表">
      <Select :options="chartOptions" v-model:value="chartType" />
    </a-form-item>
    <Button @click="openEdit">点击编辑</Button>
    <VFormCreate :form-config="formConfig" @update-chart="updateChart" ref="vform" />
  </div>
</template>
<script lang="ts" setup>
  import { Button, Select, FormItem as AFormItem } from 'ant-design-vue';
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
  //const emit = defineEmits(['update:props']);
  const vform = ref(null),
    chartType = ref(chartOptions?.[0].value || 'lineBar');
  //const [formState] = useRuleFormItem(props, 'props', 'update:props');
  //const options;
  const openEdit = () => {
    vform.value.getFormItem('modal').getModal().show();
  };
  const formConfig = ref();
  watchEffect(() => {
    if (chartType.value) formConfig.value = settingMap[chartType.value];
    if (vform.value?.context && formConfig.value)
      formatRules(formConfig.value.schemas, vform.value?.context);
  });

  const updateChart = (options) => {
    debugger;
  };
</script>
