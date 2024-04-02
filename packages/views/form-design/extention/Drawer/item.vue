<template>
  <div>
    <a-button type="primary" @click="showModal">打开</a-button>
    <a-drawer
      v-model:open="open"
      v-bind="schema.componentProps"
      :centered="true"
      @close="closeModal"
    >
      <Form :form="fApi" :model="formModelNew">
        <VFormItem
          isRender
          inSubForm
          v-for="(item, k) in schema.children"
          :key="k"
          :schema="item"
          :formData="formModelNew"
          :formConfig="formConfig"
          :setFormModel="setFormModel"
        >
          <template #[key] v-for="(value, key) in item.componentProps?.slots">
            {{ value }}
          </template>
        </VFormItem>
      </Form>
      <template #footer>
        <a-button style="margin-right: 8px" @click="handleCancle">取消</a-button>
        <a-button type="primary" @click="handleOk">提交</a-button>
      </template>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
  import VFormItem from '../../components/VFormItem/index.vue';
  import { Drawer as ADrawer, Button as AButton } from 'ant-design-vue';
  //import VFormCreate from '../../components/VFormCreate/v.vue';

  const open = ref(false);
  const fApi = ref({});
  const formModelNew = ref({});
  const setFormModel = (key, value) => {
    formModelNew.value[key] = value;
  };

  const { schema, formConfig } = toRefs(useAttrs());
  const emit = defineEmits([
    'drawerOpened',
    'okButtonClick',
    'cancelButtonClick',
    'drawerBeforeClose',
  ]);
  formConfig.value.children = schema.value.children;
  const showModal = () => {
    //为了简化，modal和drawer的打开关闭事件一致
    open.value = true;
    emit('drawerOpened');
  };
  const getFormModel = () => formModelNew.value;
  const handleOk = (e: MouseEvent) => {
    emit('okButtonClick', {
      callback: (result) => {
        open.value = !result;
      },
    });
  };
  const closeModal = () => {
    emit('drawerBeforeClose', {
      callback: (result) => {
        open.value = !result;
      },
    });
  };
  const handleCancle = () => {
    emit('cancelButtonClick');
    closeModal();
  };
  onMounted(() => {});

  defineExpose({
    showModal,
    closeModal,
    getFormModel,
    setFormModel,
  });
</script>
