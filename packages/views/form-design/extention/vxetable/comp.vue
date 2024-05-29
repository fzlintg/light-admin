<template>
  <div :style="{ width: '100%', height: props.height + 'px' }">
    <VxeBasicTable ref="tableRef" v-bind="gOptions" v-if="ifshow">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </VxeBasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { PropType, computed, nextTick, onMounted, reactive, ref, unref, watchEffect } from 'vue';
  import { ActionItem, TableAction } from '@c/Table';
  import { defHttp as axios } from '@utils/http/axios';
  import { useMessage } from '@h/web/useMessage';
  import { VxeBasicTable, VxeGridInstance } from '@c/VxeTable';
  import { TransObjectToCode, formatFunc } from '../../utils/index';
  import { cloneDeep, isNil } from 'lodash-es';

  const props = defineProps({
    height: {
      type: String as PropType<string>,
      default: '50vh',
    },
    custom: {
      type: Object as PropType<Object>,
      default: () => {},
    },
    gridVar: {
      type: Object as PropType<Object>,
      default: () => {},
    },
    gridOptions: {
      type: Object as PropType<Object>,
      default: () => {},
    },
  });
  //const attrs = useAttrs();
  const { createMessage } = useMessage();
  const tableRef = ref<VxeGridInstance>(),
    gridProps = ref({}),
    createActions = ref((row) => {}),
    gOptions = ref({}),
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
    if (props.custom.actions == '' || isNil(props.custom.actions)) return;
    const actionsTpl = TransObjectToCode(cloneDeep(toRaw(props.custom.actions)));
    createActions.value = (record) => {
      return new Function('{ record, tableRef,axios }', `return ${actionsTpl}`)({
        record,
        tableRef,
        axios,
      });
    };
  });

  watchEffect(async () => {
    ifshow.value = false;
    const data = props.gridVar ? await props.gridVar() : {};
    const columns =
      isNil(props.custom.api.columns) || props.custom.api.columns == ''
        ? []
        : await axios.get({ url: props.custom.api.columns });

    const gridTpl = TransObjectToCode(cloneDeep(toRaw(props.gridOptions)));
    const gridData = new Function(
      '{tableRef,createMessage,axios,' + Object.keys(data || {}).join(',') + '}',
      `return ${gridTpl}`,
    )({
      tableRef,
      createMessage,
      axios,
      ...data,
    });
    gOptions.value = {
      id: 'VxeTable',
      keepSource: true,
      toolbarConfig: {},
      height: 'auto',
      columns,
      ...gridData,
    };
    nextTick(() => {
      ifshow.value = true;
    });
  });
  // watchEffect(async () => {
  //   gridOptions.value.columns = await axios.get({ url: attrs.api.columns });
  //   ifshow.value = true;
  // });
  // onMounted(async () => {});

  //});
</script>
