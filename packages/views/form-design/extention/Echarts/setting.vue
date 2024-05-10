<template>
  <div>
    <a-form-item label="图表">
      <Select :options="chartOptions" v-model:value="chartType" />
    </a-form-item>
    <Button @click="openEdit">点击编辑</Button>
    <VFormCreate
      :form-config="formConfig"
      @form-model="formModel"
      @update-chart="updateChart"
      ref="vform"
      v-if="vformShow"
    />
  </div>
</template>
<script lang="ts" setup>
  import { Button, Select, FormItem as AFormItem } from 'ant-design-vue';
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import { formatRules, flattenObject, formItemsForEach } from '../../utils/index';
  import { ref, watchEffect } from 'vue';
  //import action from '../../json/vxetable.action.ts';
  import { settingMap, chartOptions, chartMap } from './tpl/loader';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { get } from 'lodash-es';

  const props = defineProps({
    props: {
      type: Object,
      default: () => ({}),
    },
  });
  //const emit = defineEmits(['update:props']);
  const vform = ref(null),
    chartType = ref(chartOptions?.[0].value || 'lineBar'),
    vformShow = ref(false);
  const formModel = ref({});
  const [formState] = useRuleFormItem(props, 'props', 'update:props');
  //const options;
  const openEdit = () => {
    vform.value!.getFormItem('modal').getModal().show(formModel.value);
  };
  const formConfig = ref({});
  watchEffect(() => {
    if (chartType.value) {
      formConfig.value = settingMap[chartType.value];
      if (formConfig.value) formatRules(formConfig.value.schemas, vform.value?.context);

      formItemsForEach(formConfig.value.schemas[0].children, (item) => {
        formModel.value[item.field] = get(chartMap[chartType.value], item.field);
      });
      vformShow.value = true;
    }

    //formState.chartOptions=
  });

  const updateChart = (options) => {
    debugger;
  };
</script>
