<template>
  <div>
    <div v-if="['Grid', 'Tabs', 'GridSubForm'].includes(formConfig.currentItem!.component)">
      <div v-for="(item, index) of formConfig.currentItem!['columns']" :key="index">
        <div class="options-box">
          <Input v-model:value="item[attrObj[comp]]" class="options-value" />
          <a class="options-delete" @click="deleteGridOptions(index)">
            <Icon icon="ant-design:delete-outlined" />
          </a>
        </div>
      </div>
      <a @click="addGridOptions">
        <Icon icon="ant-design:file-add-outlined" />
        添加{{ labelObj[comp] }}
      </a>
    </div>

    <div v-else v-for="(item, index) of formConfig.currentItem!.componentProps![key]" :key="index">
      <div class="options-box">
        <Input v-model:value="item.label" />
        <Input v-model:value="item.value" class="options-value" />
        <a class="options-delete" @click="deleteOptions(index)">
          <Icon icon="ant-design:delete-outlined" />
        </a>
      </div>
      <a @click="addOptions">
        <Icon icon="ant-design:file-add-outlined" />
        添加选项
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import { remove } from '../../../utils';
  import message from '../../../utils/message';
  import { Input } from 'ant-design-vue';
  import Icon from '@c/Icon/Icon.vue';

  export default defineComponent({
    name: 'FormOptions',
    components: { Input, Icon },
    // props: {},
    setup() {
      const { formConfig } = useFormDesignState();
      const comp = computed(() => formConfig.value?.currentItem?.component);
      const state = reactive({});
      const key = comp.value === 'TreeSelect' ? 'treeData' : 'options';
      const labelObj = {
        Grid: '栅格',
        Tabs: '标签页',
        GridSubForm: '栅格',
      };
      const attrObj = {
        Grid: 'span',
        Tabs: 'label',
        GridSubForm: 'span',
      };
      const addOptions = () => {
        if (!formConfig.value.currentItem?.componentProps?.[key])
          formConfig.value.currentItem!.componentProps![key] = [];
        const len = formConfig.value.currentItem?.componentProps?.[key].length + 1;
        formConfig.value.currentItem!.componentProps![key].push({
          label: `选项${len}`,
          value: '' + len,
        });
      };
      const deleteOptions = (index: number) => {
        remove(formConfig.value.currentItem?.componentProps?.[key], index);
      };

      const addGridOptions = () => {
        if (comp.value == 'Grid') {
          formConfig.value.currentItem?.['columns']?.push({
            span: 12,
            children: [],
          });
        } else
          formConfig.value.currentItem?.['columns']?.push({
            label: `标签${formConfig.value.currentItem?.['columns'].length + 1}`,
            children: [],
          });
      };
      const deleteGridOptions = (index: number) => {
        if (formConfig.value.currentItem!['columns'].length == 1)
          return message.warning(`请至少保留一个${labelObj[comp.value]}`);
        remove(formConfig.value.currentItem!['columns']!, index);
      };
      return {
        ...toRefs(state),
        formConfig,
        addOptions,
        deleteOptions,
        key,
        deleteGridOptions,
        addGridOptions,
        labelObj,
        attrObj,
        comp,
      };
    },
  });
</script>

<style lang="less" scoped>
  .options-box {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .options-value {
      margin: 0 8px;
    }

    .options-delete {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #f5f5f5;
      color: #666;
      line-height: 30px;
      text-align: center;

      &:hover {
        background: #ff4d4f;
      }
    }
  }
</style>
