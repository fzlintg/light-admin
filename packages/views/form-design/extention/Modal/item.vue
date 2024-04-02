<template>
  <div>
    <button @click="showModal">打开</button>
    <a-modal
      v-model:open="open"
      v-bind="schema.componentProps"
      :centered="true"
      @ok="handleOk"
      @cancel="handleCancle"
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
    </a-modal>
  </div>
</template>
<script setup lang="ts">
  import VFormItem from '../../components/VFormItem/index.vue';
  import { Modal as AModal } from 'ant-design-vue';
  //import VFormCreate from '../../components/VFormCreate/v.vue';
  import { formatRules } from '../../utils/index';

  const open = ref(false);
  const fApi = ref({});
  const formModelNew = ref({});
  const setFormModel = (key, value) => {
    formModelNew.value[key] = value;
  };

  const { schema, formConfig } = toRefs(useAttrs());
  const emit = defineEmits([
    'dialogOpened',
    'okButtonClick',
    'cancelButtonClick',
    'dialogBeforeClose',
  ]);
  formConfig.value.children = schema.value.children;
  const showModal = () => {
    open.value = true;
    emit('dialogOpened');
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
    emit('dialogBeforeClose', {
      callback: (result) => {
        open.value = !result;
      },
    });
  };
  const handleCancle = () => {
    emit('cancelButtonClick');
    closeModal();
  };
  onMounted(() => {
    // formatRules(schema.value);
  });
  // const emitPromise=(evt,data)=>{
  //   return new Promise((resolve, reject) => {
  //   const timer = setTimeout(() => reject(new Error('Timeout')), 5000); // 5秒超时
  //   emit(evt, data);

  //   const removeListener = this.$once(`${event}-reply`, (returnData) => {
  //     clearTimeout(timer);
  //     resolve(returnData);
  //   });

  //   // 如果组件销毁，取消监听
  //   this.$on('hook:destroyed', removeListener);
  // });
  // }
  defineExpose({
    showModal,
    closeModal,
    getFormModel,
    setFormModel,
  });
</script>
