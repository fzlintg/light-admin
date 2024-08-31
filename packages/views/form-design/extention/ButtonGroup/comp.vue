<template>
  <div>
    <a-button-group v-bind="schema.componentProps">
      <Button v-for="item in schema.children" :key="item.buttonText" v-bind="item">
        {{ item.buttonText }}
      </Button>
    </a-button-group>
  </div>
</template>
<script setup>
  import { Button, ButtonGroup as AButtonGroup } from 'ant-design-vue';

  const { schema } = toRefs(useAttrs());
</script>
