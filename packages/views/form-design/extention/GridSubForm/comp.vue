<template>
  <div class="grid-box mx-3 sub-form-container flex-1">
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
          <Col :span="1">
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
          <Col :span="23">
            <Row>
              <!-- <Col
                class="grid-col my-3"
                v-for="(colItem, colIdx) in props.schema.columns"
                :key="colIdx"
                :span="colItem.span"
                ><Row> -->
              <VFormItem
                class="my-3"
                isRender
                v-for="(vitem, k) in showFormItem(rowIdx)"
                :key="k"
                :schema="vitem"
                :form-model="getRowModel(rowId)"
                :formConfig="props.formConfig"
                :setFormModel="setRowModel(rowId)"
                subFormType="gridSubForm"
                @sub-item-hide="removeItem(rowIdx, vitem.field)"
              />
              <Col span="6" v-if="hideFormItem(rowIdx).length > 0" class="d-flex my-3">
                <a-select
                  mode="multiple"
                  v-model:value="selectShowItem"
                  :options="
                    hideFormItem(rowIdx).map((i) => ({
                      value: i.field,
                      label: i.label,
                    }))
                  "
                  style="width: 100%"
                  placeholder="添加配置"
                />
                <a-button @click="addShowItem(rowIdx)">确定</a-button>
              </Col>
            </Row>
          </Col>
          <!-- </Row></Col
          > -->
        </Row>
      </template>
    </draggable>
  </div>
</template>
<script setup>
  import { Row, Col, Button as AButton, Select as ASelect } from 'ant-design-vue';
  import VFormItem from '../../components/VFormItem/index.vue';

  import Icon from '@c/Icon/Icon.vue';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { propTypes } from '@utils/propTypes';
  //import { useFormModelState } from '../../hooks/useFormDesignState.ts';
  import { cloneDeep, uniqueId } from 'lodash-es';
  import draggable from 'vuedraggable';
  import {
    getInitValue,
    formModelToData,
    formItemsForEach,
    getChildFieldList,
    getChildItemList,
    assignAdd,
  } from '../../utils';
  //import { item } from '../loader';

  const props = defineProps({
    value: propTypes.Object || propTypes.function,
    schema: propTypes.Object,
    formModel: propTypes.Object,
    formData: propTypes.Object,
    formConfig: propTypes.Object,
    setFormModel: propTypes.function,
  });
  //模型数据存储formModel，用于实时更新，对于GridSubForm的属性
  //表单数据需把formModel转换，把json数据展开。
  const emit = defineEmits(['update:value', 'rowChange', 'rowAdd', 'rowDelete', 'rowInsert']);
  const [stateModel] = useRuleFormItem(props, 'value', 'change');

  stateModel.value = stateModel.value || [];
  // const stateModel = ref(flattenArray(stateData.value));

  const rowIds = reactive([]);
  const showItemRow = reactive([]);

  const initKeys = props.schema.children
    .filter((item) => !item.componentProps.hideSub)
    .map((item) => item.field);
  // formItemsForEach(props.schema.children, (item) => {
  //   if (!item.componentProps.hideSub) initKeys.push(item.field);
  // });

  const initData = () => {
    watchEffect(() => {
      if (Array.isArray(stateModel.value)) {
        rowIds.splice(0, rowIds.length);
        //自带初始值，配套提供rowIds
        for (let i = 0; i < stateModel.value.length; i++) {
          rowIds.push(uniqueId('gsf_'));
          assignAdd(stateModel.value[i], initModel);
          let modelKeys = Object.keys(stateModel.value[i]);
          showItemRow[i] = props.schema.children //lintg 202405-09
            .filter((item) => {
              let result = false;
              formItemsForEach([item], (citem) => {
                if (modelKeys.includes(citem.field)) {
                  result = true;
                }
              });
              return result;
            })
            .map((item) => item.field);
        }
      }
    });
  };

  const showFormItem = (idx) => {
    return props.schema.children.filter((item) => showItemRow[idx].includes(item.field));
  };
  const hideFormItem = (idx) => {
    return unref(props.schema.children).filter((i) => !showItemRow[idx].includes(i.field));
  };

  const removeItem = (idx, field) => {
    let targetIdx = showItemRow[idx].indexOf(field);
    if (targetIdx > -1) {
      showItemRow[idx].splice(targetIdx, 1);
      const fieldList = getChildFieldList(props.schema.children, field);
      fieldList.forEach((field) => {
        delete stateModel.value[idx][field];
      });
    }
  };
  const addShowItem = (idx) => {
    selectShowItem.value.forEach((field) => {
      const itemList = getChildItemList(props.schema.children, field);
      itemList.forEach((item) => {
        stateModel.value[idx][item.field] =
          item.defaultValue || item.componentProps.defaultValue || '';
      });
    });
    // props.schema.children.forEach((item) => {
    //   if (selectShowItem.value.includes(item.field) && showItemRow[idx].indexOf(item.field) == -1) {
    //     showItemRow[idx].push(item.field);
    //     if (['container', 'showItem'].includes(item.type)) return;
    //     stateModel.value[idx][item.field] =
    //       item.defaultValue || item.componentProps.defaultValue || '';
    //   }
    // });
    selectShowItem.value = [];
  };
  const selectShowItem = ref([]);
  const subFormDefaultModel = reactive({});
  getInitValue([props.schema], subFormDefaultModel);
  const initModel = toRaw(subFormDefaultModel[props.schema.field][0]);
  //const initValue = toRaw(formModelToData(subFormDefaultModel[props.schema.field][0]));

  onMounted(() => {
    // watchEffect(() => {
    //   // stateData.value = formModelToData(stateModel.value);
    //   // emit('update:value', stateData.value);
    //   // emit('rowChange', stateData.value);
    // });
    initData();
    if (stateModel.value?.length == 0) {
      rowIds.splice(0, rowIds.length);
      addRowId();
    } //保持至少一行
  });
  // watch(
  //   () => state.value,
  //   (v) => {
  //     emit('update:value', v);
  //     emit('rowChange', v);
  //   },
  //   {
  //     deep: true,
  //     immediate: true,
  //   },
  // );

  const addRowId = () => {
    rowIds.push(uniqueId('gsf_'));
    //  stateData.value.push(cloneDeep(initValue));
    stateModel.value.push(cloneDeep(initModel));

    showItemRow.push(cloneDeep(initKeys));
    const idx = stateModel.value.length - 1;
    //emit('rowAdd', { idx, data: stateData.value, row: stateData.value[idx] });
    emit('rowAdd', { idx, data: stateModel.value, row: stateModel.value[idx] });
  };
  const getRow = (rowId) => {
    //   return stateData.value[rowIds.indexOf(rowId)];
    return formModelToData(stateModel.value[rowIds.indexOf(rowId)]);
  };
  const getRowModel = (rowId) => {
    return stateModel.value[rowIds.indexOf(rowId)];
  };

  const setRowModel = (rowId) => {
    return (field, value) => {
      const idx = rowIds.indexOf(rowId);
      stateModel.value[idx][field] = value;
    };
  };
  const removeRowId = (idx) => {
    emit('rowDelete', { idx, data: stateModel.value, row: stateModel.value[idx] });
    rowIds.splice(idx, 1);
    // stateData.value.splice(idx, 1);
    stateModel.value.splice(idx, 1);
    showItemRow.splice(idx, 1);
  };
  const insertRowId = (idx) => {
    rowIds.splice(idx, 0, uniqueId('gsf_'));
    //  stateData.value.splice(idx, 0, cloneDeep(initValue));
    stateModel.value.splice(idx, 0, cloneDeep(initModel));
    showItemRow.splice(idx, 0, cloneDeep(initKeys));
    emit('rowInsert', { idx, data: stateModel.value, row: stateModel.value[idx] });
  };
  const dragend = ({ oldIndex, newIndex }) => {
    rowIds.splice(newIndex, 0, rowIds.splice(oldIndex, 1)[0]);
    //  stateData.value.splice(newIndex, 0, stateData.value.splice(oldIndex, 1)[0]);
    stateModel.value.splice(newIndex, 0, stateModel.value.splice(oldIndex, 1)[0]);
    showItemRow.splice(newIndex, 0, showItemRow.splice(oldIndex, 1)[0]);
    return true;
  };

  defineExpose({ getRow, initData });
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
