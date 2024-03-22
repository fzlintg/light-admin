<template>
  <div class="grid-box mx-3 sub-form-container">
    <Row class="header-row bg-light b-1">
      <a-button @click="addRowId" type="primary" shape="circle" class="my-2">
        <template #icon> <Icon icon="ant-design:plus-outlined" /> </template>
      </a-button>
    </Row>

    <draggable
      v-model="rowIds"
      :item-key="(ele) => ele"
      v-bind="{ group: 'optionsGroup', ghostClass: 'ghost', handle: '.drag-option' }"
      @end="dragend"
    >
      <template #item="{ element: rowId, index: rowIdx }">
        <Row class="sub-form-row" v-bind="props.schema.componentProps" :key="rowId">
          <Col :span="2">
            <span class="d-flex flex-column ai-center">
              <Icon icon="ant-design:drag-outlined" class="drag-option" />
              <Icon
                icon="ant-design:plus-circle-twotone"
                @click="insertRowId(rowIdx)"
                color="blue"
                class="my-3 hand"
              />
              <Icon
                icon="ant-design:minus-circle-twotone"
                @click="removeRowId(rowIdx)"
                class="hand"
                color="red"
              /> </span
          ></Col>
          <Col :span="22">
            <Row>
              <Col
                class="grid-col my-3"
                v-for="(colItem, colIdx) in props.schema.columns"
                :key="colIdx"
                :span="colItem.span"
              >
                <VFormItem
                  isRender
                  v-for="(item, k) in colItem.children"
                  :key="k"
                  :schema="item"
                  :formData="getRow(rowId)"
                  :formConfig="props.formConfig"
                  :setFormModel="setRowData(rowId)"
                  :inSubForm="true"
                />
              </Col> </Row
          ></Col>
        </Row>
      </template>
    </draggable>
  </div>
</template>
<script setup>
  import { Row, Col, Button as AButton } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';
  import { h, defineProps } from 'vue';

  import Icon from '@c/Icon/Icon.vue';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  //import { useFormModelState } from '../../hooks/useFormDesignState.ts';
  import { cloneDeep, set, uniqueId } from 'lodash-es';
  import draggable from 'vuedraggable';
  import { useFormValues } from '@c/Form/src/hooks/useFormValues.ts';

  const props = defineProps({
    value: propTypes.string || propTypes.function,
    schema: propTypes.Object,
    formData: propTypes.Object,
    formConfig: propTypes.Object,
    setFormModel: propTypes.function,
  });
  const emit = defineEmits(['update:value']);
  const [state] = useRuleFormItem(props, 'value', 'change');
  state.value = [];
  const rowIds = reactive([]);
  const defaultValueRef = ref({});
  const rowModel = ref({});
  debugger;
  const { initDefault } = useFormValues({
    defaultValueRef,
    getSchema: () => props.schema.columns,
    formModel: rowModel,
  });
  initDefault();
  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
    },
    {
      deep: true,
      immediate: true,
    },
  );

  const addRowId = () => {
    rowIds.push(uniqueId('gsf_'));
    state.value.push(cloneDeep(defaultValueRef.value));
  };
  const getRow = (rowId) => {
    return state.value[rowIds.indexOf(rowId)];
  };

  const setRowData = (rowId) => {
    return (field, value, e) => {
      const idx = rowIds.indexOf(rowId);
      set(state.value[idx], field, value);
    };
  };
  const removeRowId = (idx) => {
    rowIds.splice(idx, 1);
    state.value.splice(idx, 1);
  };
  const insertRowId = (idx) => {
    rowIds.splice(idx, 0, uniqueId('gsf_'));
    state.value.splice(idx, 0, {});
  };
  const dragend = ({ oldIndex, newIndex }) => {
    rowIds.splice(newIndex, 0, rowIds.splice(oldIndex, 1)[0]);
    state.value.splice(newIndex, 0, state.value.splice(oldIndex, 1)[0]);
    return true;
  };
  addRowId();
</script>
<style lang="scss" scoped>
  .drag-option {
    cursor: move;
  }

  .sub-form-container {
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
</style>
