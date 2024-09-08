<template>
  <div>
    <tag v-bind="schema.componentProps">
      <Icon v-if="schema.componentProps.tagIcon" :icon="schema.componentProps.tagIcon" />
      {{ schema.componentProps.text }}
    </tag>
  </div>
</template>
<script setup>
  import { Tag } from 'ant-design-vue';
  import { getAttrs } from '../../utils';

  const { schema } = getAttrs();
  const setText = (val) => {
    schema.value.componentProps.text = val;
  };
  defineExpose({
    setText,
    getText: () => schema.value.componentProps.text,
    init: schema.value.componentProps._init,
  });
</script>
