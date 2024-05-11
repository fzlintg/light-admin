<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, onMounted, watchEffect } from 'vue';
  import { useECharts } from '@h/web/useECharts';
  import { isEmpty } from 'lodash-es';
  import { formatFunc } from '../../utils/index.ts';
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
    chartTpl: {
      type: String as PropType<String>,
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
        new Function(
          '{' + Object.keys(data).concat('echarts').join(',') + '}',
          `return ${props.chartTpl}`,
        )({
          echarts,
          ...data,
        }),
      );
    }
  });
</script>
