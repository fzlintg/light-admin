<template>
  <div :style="{ width: '100%', height: attrs.height + 'px' }">
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" v-if="ifshow">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </VxeBasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, unref, watchEffect } from 'vue';
  import { ActionItem, TableAction } from '@c/Table';
  import { defHttp as axios } from '@utils/http/axios';
  import { useMessage } from '@h/web/useMessage';
  import { VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { TransObjectToCode, formatFunc } from '../../utils/index';
  import { cloneDeep, isNil } from 'lodash-es';

  const attrs = useAttrs();
  const { createMessage } = useMessage();
  const tableRef = ref<VxeGridInstance>(),
    gridProps = ref({}),
    createActions = ref((row) => {}),
    gridOptions = ref({}),
    ifshow = ref(false);

  //   const refreshGrid = async () => {
  //   if (!isEmpty(props.chartTpl)) {
  //     let data = await props.gridVar();
  //     // const tpl = TransObjectToCode(eval('(' + props.chartTpl + ')'));
  //     const tpl = TransObjectToCode(cloneDeep(props.chartTpl));
  //     setOptions(
  //       new Function(
  //         '{' +
  //           Object.keys(data || {})
  //             .concat('echarts')
  //             .join(',') +
  //           '}',
  //         `return ${tpl}`,
  //       )({
  //         echarts,
  //         ...data,
  //       }),
  //     );
  //   }
  // };

  watchEffect(async () => {
    const actionsTpl = TransObjectToCode(cloneDeep(toRaw(attrs.custom.actions)));
    createActions.value = (record) => {
      return new Function('{ record, tableRef,axios }', `return ${actionsTpl}`)({
        record,
        tableRef,
        axios,
      });
    };
  });

  watchEffect(async () => {
    const data = attrs.gridVar ? await attrs.gridVar() : {};
    const columns =
      isNil(attrs.custom.api.columns) || attrs.custom.api.columns == ''
        ? []
        : await axios.get({ url: attrs.custom.api.columns });

    const gridTpl = TransObjectToCode(cloneDeep(toRaw(attrs.gridOptions)));
    gridProps.value = new Function(
      '{tableRef,createMessage,axios,' + Object.keys(data || {}).join(',') + '}',
      `return ${gridTpl}`,
    )({
      tableRef,
      createMessage,
      axios,
      ...data,
    });
    gridOptions.value = {
      id: 'VxeTable',
      keepSource: true,
      toolbarConfig: {},
      height: 'auto',
      columns,
      ...gridProps.value,
    };
    ifshow.value = true;
  });
  // watchEffect(async () => {
  //   gridOptions.value.columns = await axios.get({ url: attrs.api.columns });
  //   ifshow.value = true;
  // });
  // onMounted(async () => {});

  //});
</script>
