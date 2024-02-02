<template>
  <PageWrapper
    title="流程图"
    content="简单流程图示例,具体功能需要自己完善"
    contentFullHeight
    fixedHeight
  >
    <FlowChart :data="demoData" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { FlowChart } from '@c/FlowChart';
  import { PageWrapper } from '@c/Page';
  import demoData from './dataTurbo.json';
</script>
