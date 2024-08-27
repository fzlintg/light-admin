<template>
  <light-form logic="system.logicEdit" :formModel="state" />
</template>
<script setup lang="ts" name="LogicEdit">
  import { getQueryParam } from '@views/form-design/utils';
  import { defHttp as axios } from '@utils/http/axios';

  const state = ref({ type: 'sql' });
  const name = getQueryParam('name');

  onMounted(async () => {
    if (name) {
      let result = await axios.post({
        url: '/api/crud/query/base/page',
        data: { where: { name } },
      });
      state.value = result.items?.[0];
    }
  });
</script>
