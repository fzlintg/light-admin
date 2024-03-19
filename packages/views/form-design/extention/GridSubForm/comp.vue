<template>
  <div class="grid-box mx-3 sub-form-container">
    <Row class="header-row bg-light b-1">
      <a-button @click="add" class="btn-add">新增</a-button>
    </Row>
    <div>
      <Row
        class="sub-form-row"
        v-bind="props.schema.componentProps"
        v-for="(rowData, index) in state"
        :key="rowData.id"
      >
        <Col>
          <a-button type="primary" shape="circle" :icon="h(PlusOutlined)" />
        </Col>
        <Col
          class="grid-col my-3"
          v-for="(colItem, index) in props.schema.columns"
          :key="index"
          :span="colItem.span"
        >
          <VFormItem
            isRender
            v-for="(item, k) in colItem.children"
            :key="k"
            :schema="item"
            :formData="rowData"
            :formConfig="props.formConfig"
            :setFormModel="setRowData(rowData)"
          />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script setup>
  import { Row, Col, Button as AButton } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';
  import { h, defineProps } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
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
  //const { formModel: formData1, setFormModel } = useFormModelState();
  //provide('formModel', () => formData1[props.schema.field]);

  const [state] = useRuleFormItem(props, 'value', 'change');
  state.value = [{ id: uniqueId('gsf_') }];

  //const { t } = useI18n();
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

  const add = () => {
    state.value.push({ id: uniqueId('gsf_') });
  };

  const setRowData = (row) => {
    return (field, value) => {
      debugger;
      set(row, field, value);
    };
  };
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
