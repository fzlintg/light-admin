<template>
  <div>
    <light-form :logic="`crud.${props.db}.${state}.form`" @submit="loadData" />
    <VxeBasicTable ref="tableRef" v-bind="gOptions" v-if="ifshow">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </VxeBasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { PropType, ref, useAttrs, toRefs, onMounted } from 'vue';
  import { defHttp as axios } from '@utils/http/axios';
  import { TableAction } from '@c/Table';
  import { VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { TransObjectToCode, formatFunc } from '../../utils/index';
  import { cloneDeep } from 'lodash-es';
  import { useMessage } from '@h/web/useMessage';

  const props = defineProps({
    db: {
      type: String as PropType<string>,
      default: '50vh',
    },
    table: {
      type: String as PropType<string>,
      default: '',
    },
  });
  const createMessage = useMessage();
  const [state] = useRuleFormItem(props, 'table', 'change');
  const { schema } = toRefs(useAttrs());
  const gOptions = ref({}),
    tableRef = ref(),
    ifshow = ref(false),
    createActions = ref((row) => {});

  onMounted(async () => {
    let gridOptions = await axios.get({
      url: `/api/crud/getGridOptions/${props.db}/${props.table}`,
    });
    const gridTpl = TransObjectToCode(cloneDeep(gridOptions));
    const gridData = new Function('{tableRef,createMessage,axios}', `return ${gridTpl}`)({
      tableRef,
      createMessage,
      axios,
    });
    gOptions.value = gridData;
    ifshow.value = true;
  });
  const loadData = (form) => {
    tableRef.value.commitProxy('query', { form });
  };
</script>
