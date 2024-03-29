<template>
  <div class="grid-box mx-3 sub-form-container flex-1">
    <Row class="header-row bg-light b-1">
      <div class="w-20 jc-center d-flex">
        <a-button @click="addRowId" type="primary" shape="circle" class="my-2">
          <template #icon> <Icon icon="ant-design:plus-outlined" /> </template>
        </a-button>
      </div>
      <div v-for="(item, k) in schema.children" :style="item.width ? { width: item.width } : {}"
        >{{ item.label }}
      </div>
    </Row>

    <draggable
      v-model="rowIds"
      :item-key="(ele) => ele"
      v-bind="{ group: 'optionsGroup', ghostClass: 'ghost', handle: '.drag-option' }"
      @end="dragend"
    >
      <template #item="{ element: rowId, index: rowIdx }">
        <Row class="header-row" v-bind="props.schema.componentProps" :key="rowId">
          <span class="d-flex ai-center w-20">
            <Icon icon="ant-design:drag-outlined" class="drag-option" />
            <Icon
              icon="ant-design:plus-circle-twotone"
              @click="insertRowId(rowIdx)"
              color="blue"
              class="mr-2 hand"
            />
            <Icon
              icon="ant-design:minus-circle-twotone"
              @click="removeRowId(rowIdx)"
              class="hand"
              color="red"
            />
          </span>

          <VFormItem
            class="form-item-box"
            isRender
            hiddenLabel
            :style="{ width: item.width }"
            v-for="(item, k) in schema.children"
            :key="k"
            :schema="item"
            :formData="getRow(rowId)"
            :formConfig="props.formConfig"
            :setFormModel="setRowData(rowId)"
            :inSubForm="true"
            parentComp="SubForm"
          />
        </Row>
      </template>
    </draggable>
  </div>
</template>
<script setup>
  import { Row, Button as AButton } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';
  import { h, defineProps } from 'vue';

  import Icon from '@c/Icon/Icon.vue';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  //import { useFormModelState } from '../../hooks/useFormDesignState.ts';
  import { cloneDeep, set, uniqueId } from 'lodash-es';
  import draggable from 'vuedraggable';
  import { getInitValue } from '../../utils';

  const props = defineProps({
    value: propTypes.string || propTypes.function,
    schema: propTypes.Object,
    formData: propTypes.Object,
    formConfig: propTypes.Object,
    setFormModel: propTypes.function,
  });
  const emit = defineEmits(['update:value']);
  const [state] = useRuleFormItem(props, 'value', 'change');
  const rowIds = reactive([]);
  state.value = state.value || [];
  if (Array.isArray(state.value)) {
    //自带初始值，配套提供rowIds
    for (let i = 0; i < state.value.length; i++) {
      rowIds.push(uniqueId('gsf_'));
    }
  }

  const subFormDefaultValue = reactive({});
  getInitValue([props.schema], subFormDefaultValue);
  const initValue = toRaw(subFormDefaultValue[props.schema.field][0]);
  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
      emit('rowChange', v);
    },
    {
      deep: true,
      immediate: true,
    },
  );

  const addRowId = () => {
    rowIds.push(uniqueId('gsf_'));
    state.value.push(cloneDeep(initValue));
    const idx = state.value.length - 1;
    emit('rowAdd', { idx, data: state.value, row: state.value[idx] });
  };
  const getRow = (rowId) => {
    return state.value[rowIds.indexOf(rowId)];
  };

  const setRowData = (rowId) => {
    return (field, value) => {
      const idx = rowIds.indexOf(rowId);
      set(state.value[idx], field, value);
    };
  };
  const removeRowId = (idx) => {
    emit('rowDelete', { idx, data: state.value, row: state.value[idx] });
    rowIds.splice(idx, 1);
    state.value.splice(idx, 1);
  };
  const insertRowId = (idx) => {
    rowIds.splice(idx, 0, uniqueId('gsf_'));
    state.value.splice(idx, 0, cloneDeep(initValue));
    emit('rowInsert', { idx, data: state.value, row: state.value[idx] });
  };
  const dragend = ({ oldIndex, newIndex }) => {
    rowIds.splice(newIndex, 0, rowIds.splice(oldIndex, 1)[0]);
    state.value.splice(newIndex, 0, state.value.splice(oldIndex, 1)[0]);
    return true;
  };
  rowIds.length == 0 && addRowId(); //保持至少一行
</script>
<style lang="scss" scoped>
  .drag-option {
    cursor: move;
  }

  div.action-header-column {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    padding: 8px;
    border: 1px solid #e1e2e3;
    background: #f1f2f3;

    .action-label {
      margin-right: 12px;
    }

    .action-button {
      padding-right: 8px;
      padding-left: 8px;
    }
  }

  .sub-form-table-column {
    display: inline-block;
  }

  .sub-form-container {
    min-height: 120px;
    margin-bottom: 8px;
    text-align: left; //IE浏览器强制居左对齐

    :deep(div.header-row) {
      display: flex;
      padding: 0;
    }

    :deep(div.sub-form-row) {
      display: flex;
      align-items: center;
      padding: 0;
      border: 1px solid #e1e2e3;

      .row-number-span {
        margin-left: 16px;
      }
    }
  }

  .form-item-box {
    position: relative;
    box-sizing: border-box;
    word-wrap: break-word;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .ant-form-item {
      // 修改ant form-item的margin为padding
      margin: 0;
      padding-bottom: 6px;
    }
  }
</style>