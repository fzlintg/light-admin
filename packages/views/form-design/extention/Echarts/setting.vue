<template>
  <div>
    <a-form-item label="图表"
      ><div class="d-flex">
        <Select
          :options="chartOptions"
          v-model:value="chartState.componentProps.tpl"
          class="flex-1"
        /><Button @click="loadTpl">加载模版</Button>
      </div>
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
  import { computed, ref, watch, onMounted, nextTick, watchEffect } from 'vue';
  import { useMessage } from '@h/web/useMessage';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { settingMap, chartOptions, chartMap, schemaMap } from './tpl/loader';
  import { cloneDeep, forOwn, get, isNil, set, isEmpty, merge } from 'lodash-es';

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
  const chartConfig = computed(() => chartState.value.componentProps.chartTpl);
  const formShow = ref(false);
  // const fApi = ref();
  const formConfig = ref({});
  const formModel = ref({});
  const vform = ref(null);
  const initSetting = (type) => {
    formShow.value = false;
    formConfig.value = settingMap[type];
    if (formConfig.value) {
      formatRules(formConfig.value.schemas);
      formModel.value = {};
      formItemsForEach(formConfig.value.schemas[0].children, (item) => {
        formModel.value[item.field] = get(chartConfig.value, item.field);
      });
    }
    nextTick(() => {
      formShow.value = true;
    });
  };
  const initState = () => {
    if (isEmpty(chartState.value.componentProps.chartTpl) && chartType.value)
      chartState.value.componentProps.chartTpl = unref(cloneDeep(chartMap[chartType.value]));
    initSetting(chartType.value);
    merge(chartState.value, schemaMap[chartType.value]);
    formatFunc(chartState.value.componentProps);
  };
  onMounted(() => {
    initState();
    // if (!isEmpty(chartState.value.componentProps.chartTpl))
    //   chartConfig.value = chartState.value.componentProps.chartTpl;
    // else if (chartType.value) chartConfig.value = cloneDeep(chartMap[chartType.value]);
  });
  watch(
    () => chartState.value.componentProps.chartVar__func,
    () => {
      formatFunc(chartState.value.componentProps);
    },
  );

  watch(
    () => chartState.value.key,
    () => {
      initSetting(chartType.value);
    },
  );
  const updateChart = (options) => {
    forOwn(options, (value, key) => {
      set(chartState.value.componentProps.chartTpl, key, value);
    });
    merge(chartState.value, schemaMap[chartType.value]);
    formatFunc(chartState.value.componentProps);
    //chartState.value.componentProps.chartTpl = JSON.stringify(chartConfig.value);
    // chartState.value.componentProps.chartTpl = chartConfig.value;
  };
  const openEdit = () => {
    vform.value!.getFormItem('modal').getModal().show(formModel.value);
  };
  // formatRules(formConfig.value.schemas, {}, true);
  const loadTpl = () => {
    if (chartType.value) {
      createConfirm({
        iconType: 'warning',
        title: () => '提醒',
        content: () => '是否载入模版数据替换',
        onOk: async () => {
          chartState.value.componentProps.chartTpl = cloneDeep(chartMap[chartType.value]);
          initSetting(chartType.value);
          chartState.value.componentProps.chartVar__func = '';
          //      chartState.value.componentProps.chartTpl = cloneDeep(unref(chartConfig.value));
          //   Object.assign(chartState.value, schemaMap[chartType.value]);
          merge(chartState.value, schemaMap[chartType.value]);
          formatFunc(chartState.value.componentProps);
        },
      });
    }
  };
</script>
