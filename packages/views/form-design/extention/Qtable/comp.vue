<template>
  <div v-if="ifShowAll">
    <light-form :logic="`query.${state}.form`" @submit="loadData" :options="tableOptions" />
    <VxeBasicTable ref="tableRef" v-bind="gOptions" keep-source v-if="ifshow" />
  </div>
</template>
<script lang="ts" setup>
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { PropType } from 'vue';
  import { defHttp as axios } from '@utils/http/axios';

  import { VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { TransObjectToCode, formatFunc } from '../../utils/index';
  import { cloneDeep, merge, isNil } from 'lodash-es';
  import { useMessage } from '@h/web/useMessage';
  import * as jsonpatch from 'fast-json-patch/index.mjs';

  const props = defineProps({
    logic: {
      type: String as PropType<string>,
      default: '',
    },
  });
  const [state] = useRuleFormItem(props, 'logic', 'update:logic');
  const ifshow = ref(false);
  const gOptions = ref({});
  const loadData = () => {};
  const tableOptions = ref({});
</script>
