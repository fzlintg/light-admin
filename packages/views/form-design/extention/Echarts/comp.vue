<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, onMounted, watchEffect } from 'vue';
  import { useECharts } from '@h/web/useECharts';
  import { isEmpty } from 'lodash-es';

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
    // chartOptions: {
    //   type: Object as PropType<any>,
    //   default: () => {},
    // },
    chartTpl: {
      type: String as PropType<string>,
      default: '',
    },
    chartVar: {
      type: Function as PropType<any>,
      default: () => {},
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watchEffect(async () => {
    if (props.chartTpl != '') {
      let data = await props.chartVar();
      setOptions(
        new Function('{barData,lineData,category, echarts}', `return ${props.chartTpl}`)(data),
      );
    }

    // if (!isEmpty(props.chartOptions)) setOptions(props.chartOptions);
  });
</script>
