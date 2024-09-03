<template>
  <div v-if="ifshow">
    <light-form :logic="`queryForm.${state}`" />
    <VxeBasicTable ref="tableRef" v-bind="gOptions" keep-source />
  </div>
</template>
<script lang="ts" setup>
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { PropType, onMounted, ref, watch } from 'vue';
  import { defHttp as axios } from '@utils/http/axios';

  import { VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { TransObjectToCode, formatFunc } from '../../utils/index';
  import { cloneDeep, merge, isNil } from 'lodash-es';
  import { useMessage } from '@h/web/useMessage';
  // import * as jsonpatch from 'fast-json-patch/index.mjs';

  const props = defineProps({
    logic: {
      type: String as PropType<string>,
      default: '',
    },
  });
  const createMessage = useMessage();
  const [state] = useRuleFormItem(props, 'logic', 'update:logic');
  const ifshow = ref(false);
  const gOptions = ref({});
  const tableRef = ref(null);
  const columnAttr = ref({});

  const loadOptions = async () => {
    if (!state.value || state.value == '') return;
    let { gridOptions } = await axios.get({
      url: `/api/logic/getGridOptions/${state.value}`,
    });
    const gridTpl = TransObjectToCode(cloneDeep(gridOptions));
    const gridData = new Function('{tableRef,createMessage,axios}', `return ${gridTpl}`)({
      tableRef,
      createMessage,
      axios,
    });
    gOptions.value = gridData;
    gridData.columns.forEach((item) => {
      columnAttr.value[item.field] = item;
    });
    ifshow.value = true;
  };
  const loadDict = async () => {};
  const setLogic = (v) => {
    state.value = v;
  };

  const loadAll = async () => {
    ifshow.value = false;
    await loadOptions();
    await loadDict();
  };
  watch([() => state.value], async () => {
    await loadAll();
  });
  onMounted(async () => {
    await loadAll();
  });
  defineExpose({ setLogic, refresh: loadAll });
  const tableOptions = ref({});
</script>
