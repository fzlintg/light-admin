<template>
  <div class="p-4">
    <BasicTable @register="register">
      <template #toolbar>
        <a-button type="primary" @click="expandAll">展开全部</a-button>
        <a-button type="primary" @click="collapseAll">折叠全部</a-button>
        <a-button type="primary" @click="collapseRows(['4'])">折叠第五行</a-button>
        <a-button type="primary" @click="expandRows(['4'])">展开第五行</a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@c/Table';
  import { getBasicColumns, getTreeTableData } from './tableData';

  const [register, { expandAll, collapseAll, expandRows, collapseRows }] = useTable({
    title: '树形表格',
    isTreeTable: true,
    accordion: true, // 手风琴效果
    rowSelection: {
      type: 'checkbox',
      getCheckboxProps(record: Recordable) {
        // Demo: 第一行（id为0）的选择框禁用
        if (record.id === '0') {
          return { disabled: true };
        } else {
          return { disabled: false };
        }
      },
    },
    titleHelpMessage: '树形组件不能和序列号列同时存在',
    columns: getBasicColumns(),
    dataSource: getTreeTableData(),
    rowKey: 'id',
    showSelectionBar: true, // 显示多选状态栏
  });
</script>
