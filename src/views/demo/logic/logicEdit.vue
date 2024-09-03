<template>
  <div class="content">
    <light-form logic="system.logicEdit" :formModel="state" ref="lightFormRef" />
  </div>
</template>
<script setup lang="ts" name="LogicEdit">
  import { flattenObject, getQueryParam } from '@views/form-design/utils';
  import { defHttp as axios } from '@utils/http/axios';

  const state = ref({ type: 'sql', data: '', name: '', title: '' });
  const name = getQueryParam('name');
  const lightFormRef = ref(null);
  onMounted(async () => {
    if (name) {
      let result = await axios.post({
        url: '/api/crud/query/base/page',
        data: { where: { name } },
      });
      state.value = flattenObject(result.items?.[0]);
      setTimeout(
        // 临时解决表单组件初始化问题
        () =>
          lightFormRef.value
            .getFormRef()
            .getItemRef('dataForm')
            ?.refresh(`system.logicEdit.${state.value.type}`),
        1000,
      );
    }
  });
</script>

<style lang="scss">
  .content {
    height: 100vh; /* 设置最大高度限制 */
    overflow-y: auto; /* 这将添加垂直滚动条 */
  }
</style>
