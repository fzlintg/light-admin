<template>
  <a-dropdown v-bind="schema.componentProps" class="ml-2">
    <a class="ant-dropdown-link" @click.prevent>
      {{ schema.componentProps.title }}
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="(item, index) in schema.children" :key="index" v-bind="item">
          <a href="javascript:;">{{ item.label }}</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup>
  import { Dropdown as ADropdown, MenuItem as AMenuItem, Menu as AMenu } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { formatRules } from '../../utils/index';

  const { schema } = toRefs(useAttrs());

  formatRules([schema.value]);
</script>
