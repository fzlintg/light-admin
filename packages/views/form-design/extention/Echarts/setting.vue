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
      v-if="formShow"
    />
  </div>
</template>
<script lang="ts" setup>
  import { Button, Select, FormItem as AFormItem } from 'ant-design-vue';
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import { formatFunc, formatRules, formItemsForEach } from '../../utils/index';
  import { computed, ref, watch, onMounted } from 'vue';
  import { useMessage } from '@h/web/useMessage';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { settingMap, chartOptions, chartMap, schemaMap } from './tpl/loader';
  import { forOwn, get, isNil, set } from 'lodash-es';

  const { createConfirm } = useMessage();

  const props = defineProps({
    schema: {
      type: Object,
      default: () => ({}),
    },
    props: {
      type: Object,
      default: () => ({}),
    },
  });
  const [chartState] = useRuleFormItem(props, 'props', 'update:props');
  const chartType = computed(() => chartState.value.componentProps.tpl);
  const formShow = ref(false);
  // const fApi = ref();
  const formConfig = ref({});
  const chartConfig = ref({});
  const formModel = ref({});
  const vform = ref(null);
  const initSetting = (type) => {
    formConfig.value = settingMap[type];
    formatRules(formConfig.value.schemas);
    formModel.value = {};
    formItemsForEach(formConfig.value.schemas[0].children, (item) => {
      formModel.value[item.field] = get(chartConfig.value, item.field);
    });
  };
  onMounted(() => {
    if (chartState.value.chartTpl != '' && !isNil(chartState.value.chartTpl))
      chartConfig.value = eval('(' + chartState.value.chartTpl + ')');
    else if (chartType.value) chartConfig.value = chartMap[chartType.value];
    initSetting(chartType.value);

    formShow.value = true;
  });
  const updateChart = (options) => {
    forOwn(options, (value, key) => {
      set(chartConfig.value, key, value);
    });
    Object.assign(chartState.value, schemaMap[chartType.value]);
    formatFunc(chartState.value.componentProps);
    chartState.value.componentProps.chartTpl = JSON.stringify(chartConfig.value);
  };
  const openEdit = () => {
    vform.value!.getFormItem('modal').getModal().show(formModel.value);
  };
  // formatRules(formConfig.value.schemas, {}, true);
  watch(
    () => chartType.value,
    () => {
      if (chartType.value) {
        createConfirm({
          iconType: 'warning',
          title: () => '提醒',
          content: () => '是否载入模版数据替换',
          onOk: async () => {
            chartConfig.value = chartMap[chartType.value];
            initSetting(chartType.value);
          },
        });
      }
    },
  );
</script>
