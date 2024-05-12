<template>
  <div>
    <a-form-item label="图表">
      <Select :options="chartOptions" v-model:value="chartState.componentProps.tpl" />
    </a-form-item>

    <Button @click="openEdit">模版修改</Button>
    <VFormCreate
      :form-config="formConfig"
      :form-model="formModel"
      @update:form-model="updateChart"
      ref="vform"
      v-if="vformShow"
    />
  </div>
</template>
<script lang="ts" setup>
  import { Button, Select, FormItem as AFormItem } from 'ant-design-vue';
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import {
    formatRules,
    //  flattenObject,
    formItemsForEach,
    TransObjectToCode,
    formatFunc,
  } from '../../utils/index';
  import { computed, ref, watchEffect, watch } from 'vue';
  //import action from '../../json/vxetable.action.ts';
  import { settingMap, chartOptions, chartMap, schemaMap } from './tpl/loader';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { cloneDeep, get, set, forOwn } from 'lodash-es';
  //import { getLineData } from './data';
  //import echarts from '@utils/lib/echarts';

  //const { barData, lineData, category } = getLineData;
  //const { echarts } = useECharts(chartRef);
  const props = defineProps({
    props: {
      type: Object,
      default: () => ({}),
    },
  });

  //const emit = defineEmits(['update:props']);
  const vform = ref(null),
    //  chartType = ref(chartOptions?.[0].value || 'lineBar'),
    vformShow = ref(false);
  const formModel = ref({});
  const [chartState] = useRuleFormItem(props, 'props', 'update:props');
  //debugger;
  const chartType = computed(() => chartState.value.componentProps.tpl);
  //const options;
  const openEdit = () => {
    vform.value!.getFormItem('modal').getModal().show(formModel.value);
  };
  const formConfig = ref({});
  const chartConfig = ref();
  chartConfig.value = unref(chartState.value.chartTpl);

  watch(
    () => chartType.value,
    () => {
      if (chartType.value) {
        formConfig.value = settingMap[chartType.value];
        if (formConfig.value) {
          formatRules(formConfig.value.schemas); //初始化配置组件schemas
          formItemsForEach(formConfig.value.schemas[0].children, (item) => {
            formModel.value[item.field] = get(chartMap[chartType.value], item.field);
          });
        }
        vformShow.value = true;
        // updateChart({});
      }
    },
  );
  // watchEffect(
  //   () => {
  //     if (chartType.value) {
  //       formConfig.value = settingMap[chartType.value];
  //       if (formConfig.value) {
  //         formatRules(formConfig.value.schemas); //初始化配置组件schemas
  //         formItemsForEach(formConfig.value.schemas[0].children, (item) => {
  //           formModel.value[item.field] = get(chartMap[chartType.value], item.field);
  //         });
  //       }

  //       vformShow.value = true;
  //       // updateChart({});
  //     }
  //   },
  //   //formState.chartOptions=
  // );

  const updateChart = (options) => {
    const chartOptions = cloneDeep(chartMap[chartType.value]);
    forOwn(options, (value, key) => {
      set(chartOptions, key, value);
    });
    Object.assign(chartState.value, schemaMap[chartType.value]); //取默认值
    formatFunc(chartState.value.componentProps);
    chartState.value.componentProps.chartTpl = TransObjectToCode(chartOptions, true);

    // chartState.value.componentProps.chartVar = {
    //   barData,
    //   lineData,
    //   category,
    //   echarts,
    // };
    // chartState.value.componentProps.chartOptions = new Function(
    //   '{barData,lineData,category, echarts}',
    //   `return ${chartTpl}`,
    // )({
    //   barData,
    //   lineData,
    //   category,
    //   echarts,
    // });
    //chartState.value = chartOptions;
  };
</script>
