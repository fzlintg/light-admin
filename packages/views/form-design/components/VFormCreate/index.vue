<!--
 * @Description: 表单渲染器，根据json生成表单
-->
<template>
  <div class="v-form-container">
    <Form class="v-form-model" ref="eFormModel" :model="formModel" v-bind="formModelProps">
      <Row class="ai-end">
        <VFormItem
          isRender
          v-for="(schema, index) of noHiddenList"
          :key="index"
          :schema="schema"
          :formConfig="formConfig"
          :formData="formModelNew"
          @change="handleChange({ schema, value: $event })"
          @update:form-model="updateFormModel"
          :setFormModel="setFormModel"
          @submit="handleSubmit"
          @reset="resetFields"
          :debug="debug"
        >
          <template v-if="schema && schema.componentProps" #[`schema.componentProps!.slotName`]>
            <slot
              :name="schema.componentProps!.slotName"
              v-bind="{ formModel: formModel, field: schema.field, schema }"
            ></slot>
          </template>
        </VFormItem>
      </Row>
    </Form>
  </div>
</template>
<script lang="ts">
  import {
    onMounted,
    computed,
    defineComponent,
    PropType,
    provide,
    ref,
    unref,
    reactive,
    getCurrentInstance,
  } from 'vue';
  //import FormRender from './components/FormRender.vue';
  import { IFormConfig, AForm } from '../../typings/v-form-component';
  import { Form, Row, Col } from 'ant-design-vue';
  import { useFormInstanceMethods } from '../../hooks/useFormInstanceMethods';
  import { IProps, IVFormMethods, useVFormMethods } from '../../hooks/useVFormMethods';
  import { useVModel } from '@vueuse/core';
  import { omit, template } from 'lodash-es';
  import { useFormValues } from '../../../../components/Form/src/hooks/useFormValues';
  import VFormItem from '../VFormItem/index.vue';
  import { AsyncFunction, formModelToData } from '../../utils';
  import { defHttp as axios } from '@utils/http/axios';

  export default defineComponent({
    name: 'VFormCreate',
    components: {
      VFormItem,
      Form,
      Row,
    },
    props: {
      fApi: {
        type: Object,
      },
      formModel: {
        type: Object,
        default: () => ({}),
      },
      formConfig: {
        type: Object as PropType<IFormConfig>,
        required: true,
      },
      debug: {
        type: Boolean,
        default: false,
      },
      formContext: {
        type: Object,
        default: () => ({}),
      },
      options: {
        type: Object,
        default: () => {},
      },
      parentForm: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['submit', 'change', 'update:fApi', 'update:formModel'],
    setup(props, context) {
      const wrapperComp = props.formConfig.layout == 'vertical' ? Col : Row;
      const { proxy } = getCurrentInstance();
      const { emit } = context;
      const eFormModel = ref<AForm | null>(null);
      // const getOptions=(field)=>{

      //   return props?.options?.[field]||[]
      // };
      const formModelNew = computed({
        get: () => props.formModel,
        set: (value) => {
          emit('update:formModel', value);
        },
      });
      const formItemRefList = reactive({}); //lintg
      provide('registerFormItem', (name, item) => {
        formItemRefList[name] = item;
      });
      provide('formItemRefList', formItemRefList);
      provide('getFormRef', () => {
        return proxy;
        // return eFormModel.value;
      });

      const getFormItem = (field) => formItemRefList[field];
      const getItemRef = (field) => {
        return formItemRefList[field].getItemRef();
        //return formItemRefList[field].formItemRef;
      };
      const noHiddenList = computed(() => {
        return (
          props.formConfig.schemas &&
          props.formConfig.schemas.filter((item) => item.hidden !== true)
        );
      });

      const fApi = useVModel(props, 'fApi', emit);

      const { submit, validate, clearValidate, resetFields, validateField } =
        useFormInstanceMethods<['submit', 'change', 'update:fApi', 'update:formModel']>(
          props,
          formModelNew,
          context,
          eFormModel,
        );

      const { linkOn, ...methods } = useVFormMethods<
        ['submit', 'change', 'update:fApi', 'update:formModel']
      >(
        { formConfig: props.formConfig, formData: props.formModel } as unknown as IProps,
        context,
        eFormModel,
        {
          submit,
          validate,
          validateField,
          resetFields,
          clearValidate,
        },
      );

      fApi.value = methods;

      const handleChange = (_event) => {
        const { schema, value } = _event;
        const { field } = unref(schema);

        linkOn[field!]?.forEach(async (formItem) => {
          await formItem?.componentProps?._update?.(value, formItem, fApi.value as IVFormMethods);
        });
        console.log('change', field, value);
      };
      /**
       * 获取表单属性
       */
      const formModelProps = computed(
        () => omit(props.formConfig, ['disabled', 'labelWidth', 'schemas']) as Recordable,
      );

      const handleSubmit = () => {
        submit();
      };

      provide('formModel', formModelNew);
      provide('formMethods', () => fApi.value as IVFormMethods);
      const setFormModel = (key, value) => {
        formModelNew.value[key] = value;
        console.log('changecomplete', key, value);
      };
      const updateFormModel = (model) => {
        Object.assign(formModelNew.value, model);
        emit('update:formModel', formModelNew.value);
      };

      provide<(key: String, value: any) => void>('setFormModelMethod', setFormModel);
      //lintg
      //const toRawUnref = (value) => toRaw(unref(value));
      const defaultValueRef = reactive({});
      const getSchema = computed(() => unref(noHiddenList));
      // const formModel=submit
      const { initDefault } = useFormValues({
        getProps: () => formModelProps,
        defaultValueRef,
        getSchema,
        formModel: formModelNew.value,
      });
      const dataSource = reactive({});
      const initDs = async () => {
        //  for (let item of props.formConfig?.ds) {
        props.formConfig?.ds?.forEach(async (item) => {
          let func = template(item.func)(props.formContext);
          let dsFunc = new AsyncFunction('{axios}', func);
          dataSource[item.dsName] = await dsFunc.call(proxy, { axios });
        });
      };

      onMounted(async () => {
        initDefault();
        await initDs();

        //   debugger;
        // emit('update:formModel', formModel.value);
      });
      const getParentFormRef = () => {
        return props.parentForm;
      };
      const getTopFormRef = () => {
        if (!getParentFormRef()) return proxy;
        else return getParentFormRef()?.getTopFormRef();
      };
      return {
        getTopFormRef,
        getParentFormRef,
        eFormModel,
        submit,
        validate,
        validateField,
        resetFields,
        clearValidate,
        handleChange,
        formModelProps,
        handleSubmit,
        setFormModel,
        updateFormModel,
        formModelNew,
        wrapperComp,
        noHiddenList,
        getFormItem,
        getItemRef,
        context,
        formItemRefList,
        getFormData: () => formModelToData(unref(formModelNew)),
        getFormModel: () => unref(formModelNew),
        dataSource,
        //       getOptions
      };
    },
  });
</script>

<style lang="less" scoped>
  .v-form-model {
    overflow: hidden;
  }
</style>
