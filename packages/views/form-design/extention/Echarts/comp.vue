<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, onMounted } from 'vue';
  import { useECharts } from '@h/web/useECharts';
  //import { getLineData } from './data';
  import { chartMap } from './tpl/loader';

  defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(100vh - 78px)',
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
  // const { barData, lineData, category } = getLineData;

  const attrs = useAttrs();
  onMounted(() => {
    setOptions(attrs.chartOptions);
  });
</script>
