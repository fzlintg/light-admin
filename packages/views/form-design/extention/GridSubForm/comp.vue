<template>
  <div class="grid-box mx-3 sub-form-container">
    <Row class="header-row bg-light b-1">
      <a-button @click="addRowId" :icon="h(PlusOutlined)">新增</a-button>
    </Row>

      <Row
        class="sub-form-row"
        v-bind="props.schema.componentProps"
        v-for="(rowId, rowIdx) in rowIds"
        :key="rowId"
      >
        <Col :span="2">
          <a-button
            class="m-1"
            shape="circle"
            :icon="h(PlusOutlined)"
            @click="insertRowId(rowIdx)"
          />
          <a-button
            class="m-1"
            shape="circle"
            :icon="h(MinusOutlined)"
            @click="removeRowId(rowIdx)"
          />
        </Col>
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
        </Col>
      </Row>
    </div>
 
</template>
<script setup>
  import { Row, Col, Button as AButton } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';
  import { h, defineProps } from 'vue';
  import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  import { useFormModelState } from '../../hooks/useFormDesignState.ts';
  import { set, uniqueId } from 'lodash-es';

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
    state.value.push({});
  };
  const getRow=(rowId)=>{
    return state.value[rowIds.indexOf(rowId)];
  }

  const setRowData = (rowId) => {
    return (field, value, e) => {
      const idx=rowIds.indexOf(rowId)
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

  addRowId();
</script>
<style lang="scss" scoped>
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
