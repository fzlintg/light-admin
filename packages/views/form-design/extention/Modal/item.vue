<template>
  <div>
    <a-button v-if="debug" @click="open = true">测试</a-button>
    <component
      v-model:open="open"
      v-bind="compProps"
      :centered="true"
      @ok="handleOk"
      @cancel="handleCancle"
      :is="compProps.type == 'Drawer' ? Drawer : Modal"
    >
      <VFormCreate
        v-if="open"
        :form-config="formConfigNew"
        v-model:fApi="fApi"
        v-model:formModel="formModelNew"
        ref="formRef"
        :formContext="extraData"
        :debug="debug"
        @update:form-model="updateFormModel"
        :parentForm="parentFormRef"
        @form-loaded="handleFormLoaded"
      />

      <template #insertFooter v-if="!!schema.componentProps.footerBtnText">
        <a-button @click="footerBtnClick"> {{ schema.componentProps.footerBtnText }}</a-button>
      </template>
    </component>
  </div>
</template>
<script setup lang="ts">
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import Modal from '@c/Modal/src/BasicModal.vue';
  import Drawer from '@c/Drawer/src/BasicDrawer.vue';
  import {
    findFormItem,
    flattenObject,
    formModelToData,
    setUrlParam,
    clearUrlParam,
    getAttrs,
  } from '../../utils';
  //import * as utils from '../../utils/index';
  import { computed, getCurrentInstance, inject } from 'vue';

  //import VFormCreate from '../../components/VFormCreate/v.vue';
  import { formatRules } from '../../utils/index';
  import { cloneDeep } from 'lodash-es';
  import { deepMerge } from '@utils';

  const _this = getCurrentInstance();
  const open = ref(false);
  const fApi = ref({});
  const formModelNew = ref({});
  const formRef = ref(null);
  const extraData = ref({});
  const state = ref({});
  const { schema, formConfig, debug } = getAttrs();
  // toRefs(useAttrs());
  const myProps = ref({});
  const ifLoaded = ref(false);
  const compProps = computed(() => {
    return { ...schema.value.componentProps, ...myProps.value };
  });
  const parentFormRef = inject('getFormRef', () => {})();
  const footerBtnClick = () => {
    emit('footerBtnClick');
  };
  const setFormModel = (key, value) => {
    formModelNew.value[key] = value;
  };

  const getFormModel = async (flatten = true) => {
    let data = await fApi.value.submit();
    if (flatten) return flattenObject(data);
    else return data;
  };

  const formConfigNew = computed(() => {
    const result = {
      ...formConfig.value,
      ...(compProps.value?.ds?.length > 0 ? { ds: compProps.value?.ds } : {}),
      schemas: schema.value.children,
    };
    return result;
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
    // console.log(myProps.value);
  };
  //schema.value.children = flattenArray(schema.value.children);
  // formConfig.value.children = schema.value.children;
  const getState = () => {
    return state.value;
  };
  const show = (fData, eData, { raw = false, syn = true, refresh = false, ...attrs } = {}) => {
    state.value = { fData, eData, raw, syn, ...attrs };
    if (fData) {
      formModelNew.value = raw ? cloneDeep(fData) : flattenObject(fData);
    }
    //console.log(formConfigNew.value);
    if (!refresh) formatRules(schema.value.children, false, eData);
    if (eData) extraData.value = eData;
    open.value = true;
    emit('dialogOpened', { schema, fData: formModelNew.value, eData, findFormItem });
  };

  const handleOk = async (e: MouseEvent) => {
    await state.value?.cb?.ok();
    if (state.value.syn) {
      if (state.value.raw) Object.assign(state.value.fData, formModelNew.value);
      //else state.value.fData = formModelToData(formModelNew.value);
      else
        Object.assign(
          state.value.fData,
          deepMerge(state.value.fData, formModelToData(formModelNew.value)),
        );
    }
    emit('okButtonClick', {
      _this,
      utils: { setUrlParam, clearUrlParam },
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
  const handleFormLoaded = () => {
    ifLoaded.value = true;
    if (callBack.value.length > 0) {
      callBack.value.forEach((f) => f.call(formRef.value));
      callBack.value = [];
    }
  };

  const handleCancle = () => {
    emit('cancelButtonClick');
    close();
  };
  const callBack = ref([]);
  const addCallback = (f) => {
    if (ifLoaded.value) return f.call(formRef.value);
    else callBack.value.push(f);
  };
  const updateFormModel = () => {
    //   debugger;
  };
  defineExpose({
    addCallback,
    handleFormLoaded,
    show,
    close,
    getFormModel,
    setFormModel,
    getExtraData: () => extraData.value,
    getFormData: () => formModelToData(formModelNew.value),
    getForm: () => formRef.value,
    setProps,
    getState,
  });
  const { proxy } = getCurrentInstance();
</script>
