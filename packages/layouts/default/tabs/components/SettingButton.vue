<template>
  <span :class="`${prefixCls}__extra-fold`" @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </span>
</template>
<script lang="ts" setup>
  import SettingDrawer from '@layouts/default/setting/SettingDrawer';
  import Icon from '@c/Icon/Icon.vue';

  import { useDrawer } from '@c/Drawer';

  import { useDesign } from '@h/web/useDesign';

  defineOptions({ name: 'SettingButton' });

  const [register, { openDrawer }] = useDrawer();
  const { prefixCls } = useDesign('multiple-tabs-content');
</script>
