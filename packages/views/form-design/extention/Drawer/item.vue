<template>
  <div>
    <a-button v-if="debug" @click="open = true">测试</a-button>
    <Drawer
      v-model:open="open"
      v-bind="schema.componentProps"
      :centered="true"
      @ok="handleOk"
      @cancel="handleCancle"
    >
      <VFormCreate
        :form-config="formConfigNew"
        v-model:fApi="fApi"
        v-model:formModel="formModelNew"
        ref="formRef"
        :debug="debug"
      />
    </Drawer>
  </div>
</template>
<script setup lang="ts">
  import VFormCreate from '../../components/VFormCreate/index.vue';
  import Drawer from '@c/Drawer/src/BasicDrawer.vue';
  import { flattenObject, formModelToData, setUrlParam } from '../../utils';
  import { computed, getCurrentInstance } from 'vue';
  //import VFormCreate from '../../components/VFormCreate/v.vue';
  // import { formatRules } from '../../utils/index';
  const _this = getCurrentInstance();
  const open = ref(false);
  const fApi = ref({});
  const formModelNew = ref({});
  const formRef = ref(null);
  const extraData = ref({});
  const openData = ref({});
  const { schema, formConfig, debug } = useAttrs();
  const setFormModel = (key, value) => {
    formModelNew.value[key] = value;
  };

  const formConfigNew = computed(() => {
    return { ...formConfig, schemas: toRaw(schema.children) };
  });
  const emit = defineEmits([
    'dialogOpened',
    'okButtonClick',
    'cancelButtonClick',
    'dialogBeforeClose',
  ]);
  //schema.value.children = flattenArray(schema.value.children);
  // formConfig.value.children = schema.value.children;
  const show = (fData, eData, raw = false) => {
    if (fData) {
      openData.value = fData;
      formModelNew.value = raw ? fData : flattenObject(fData);
    }
    if (eData) extraData.value = eData;
    emit('dialogOpened', { fData: formModelNew.value, eData });
    open.value = true;
  };

  const handleOk = (e: MouseEvent) => {
    emit('okButtonClick', {
      _this,
      utils: { setUrlParam },
      callback: (result) => {
        if (result) {
          //lintg.待进一步修改
          Object.assign(openData.value, formModelNew.value);
        }
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
  const getFormModel = async () => {
    const data = await fApi.value.submit?.();
    return data;
  };
  defineExpose({
    show,
    close,
    //getFormModel: () => formModelNew.value,
    getFormModel,
    setFormModel,
    getExtraData: () => extraData.value,
    getFormData: () => formModelToData(formModelNew.value),
    getForm: () => formRef.value,
  });
  //const { proxy } = getCurrentInstance();
</script>
