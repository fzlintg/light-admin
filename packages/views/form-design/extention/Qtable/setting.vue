<template>
  <div>
    <light-form logic="config.dbTable" :formModel="state.componentProps" />
    <light-form logic="dbtable.edit" remote ref="lightFormRef" />
    <AButton type="link" @click="openConfig">打开配置</AButton>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { defHttp as axios } from '@utils/http/axios';
  //import { useMessage } from '@h/web/useMessage';
  import { useRuleFormItem } from '@h/component/useFormItem';

  const lightFormRef = ref(null);
  const props = defineProps({
    schema: {
      type: Object,
      default: () => ({}),
    },
    props: {
      type: Object,
      default: () => ({}),
    },
  });
  const [state] = useRuleFormItem(props, 'props', 'update:props');
  watch(
    () => state.componentProps,
    () => {},
  );
  const openConfig = async () => {
    let [db, key] = state.value.componentProps.dbTable.split('.');

    let config = await axios.get({ url: `/api/model/tableModel/${db}/${key}` });

    lightFormRef.value?.vformRef
      ?.getItemRef('modal')
      ?.show({ ...config, db, table: key }, { db, table: key, db_id: config.db_id }, { raw: true });
  };
</script>
