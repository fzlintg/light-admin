<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, onMounted, watchEffect } from 'vue';
  import { useECharts } from '@h/web/useECharts';
  import { isEmpty, cloneDeep } from 'lodash-es';
  import { TransObjectToCode, formatFunc } from '../../utils/index.ts';
  import echarts from '@utils/lib/echarts';

  const props = defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '50vh',
      //    default: 'calc(100vh - 78px)',
    },
    // chartTpl: {
    //   type: String as PropType<String>,
    //   default: '',
    // },
    getFormItem: {
      type: Function as PropType<any>,
      default: () => {},
    },
    chartTpl: {
      type: Object as PropType<Object>,
      default: () => {},
    },
    chartVar: {
      type: Function as PropType<any>,
      default: () => {},
    },
    refresh: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    refresh_seconds: {
      type: Number as PropType<number>,
      default: 5,
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const refreshChart = async () => {
    if (!isEmpty(props.chartTpl)) {
      let data = await props.chartVar();
      // const tpl = TransObjectToCode(eval('(' + props.chartTpl + ')'));
      const tpl = TransObjectToCode(cloneDeep(props.chartTpl));
      setOptions(
        new Function(
          '{' +
            Object.keys(data || {})
              .concat('echarts')
              .join(',') +
            '}',
          `return ${tpl}`,
        )({
          echarts,
          ...data,
        }),
      );
    }
  };
  watchEffect(async () => {
    await refreshChart();
  });
  onMounted(async () => {
    setInterval(async () => {
      if (props.refresh) await refreshChart();
    }, props.refresh_seconds * 1000);
  });
</script>
