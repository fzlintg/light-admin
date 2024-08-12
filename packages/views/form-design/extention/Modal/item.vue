<template>
  <div>
    <a-button v-if="debug" @click="open = true">测试</a-button>
    <modal
      v-model:open="open"
      v-bind="compProps"
      :centered="true"
      @ok="handleOk"
      @cancel="handleCancle"
    >
      <VFormCreate
        v-if="open"
        :form-config="formConfigNew"
        v-model:fApi="fApi"
        v-model:formModel="formModelNew"
        ref="formRef"
        :debug="debug"
      />

      <template #insertFooter v-if="!!schema.componentProps.footerBtnText">
        <a-button @click="footerBtnClick"> 保存</a-button>
      </template>
    </modal>
  </div>
</template>
<script setup lang="ts">
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import Modal from '@c/Modal/src/BasicModal.vue';
  import { findFormItem, flattenObject, formModelToData, replaceUrlParam } from '../../utils';
  //import * as utils from '../../utils/index';
  import { computed, getCurrentInstance } from 'vue';

  //import VFormCreate from '../../components/VFormCreate/v.vue';
  import { formatRules } from '../../utils/index';

  const _this = getCurrentInstance();
  const open = ref(false);
  const fApi = ref({});
  const formModelNew = ref({});
  const formRef = ref(null);
  const extraData = ref({});

  const { schema, formConfig, debug } = toRefs(useAttrs());
  const myProps = ref({});
  const compProps = computed(() => {
    return { ...schema.value.componentProps, ...myProps.value };
  });
  const footerBtnClick = () => {
    emit('footerBtnClick');
  };
  const setFormModel = (key, value) => {
    formModelNew.value[key] = value;
  };

  const getFormModel = async () => {
    let data = await fApi.value.submit();
    return data;
  };

  const formConfigNew = computed(() => {
    return { ...formConfig.value, schemas: toRaw(schema.value.children) };
  });
  const emit = defineEmits([
    'dialogOpened',
    'okButtonClick',
    'cancelButtonClick',
    'dialogBeforeClose',
    'footerBtnClick',
  ]);
  const setProps = (callback) => {
    if (callback) callback({ myProps });
    console.log(myProps.value);
  };
  //schema.value.children = flattenArray(schema.value.children);
  // formConfig.value.children = schema.value.children;
  const show = (fData, eData, raw = false) => {
    if (fData) {
      formModelNew.value = raw ? fData : flattenObject(fData);
    }
    formatRules(schema.value.children, false, eData);
    if (eData) extraData.value = eData;
    open.value = true;
    emit('dialogOpened', { schema, fData: formModelNew.value, eData, findFormItem });
  };

  const handleOk = (e: MouseEvent) => {
    emit('okButtonClick', {
      _this,
      utils: { replaceUrlParam },
      callback: (result) => {
        open.value = !result;
      },
    });
  };
  const close = () => {
    emit('dialogBeforeClose', {
      callback: (result) => {
        open.value = !result;
      },
    });
  };
  const handleCancle = () => {
    emit('cancelButtonClick');
    close();
  };
  defineExpose({
    show,
    close,
    getFormModel,
    setFormModel,
    getExtraData: () => extraData.value,
    getFormData: () => formModelToData(formModelNew.value),
    getForm: () => formRef.value,
    setProps,
  });
  const { proxy } = getCurrentInstance();
</script>
