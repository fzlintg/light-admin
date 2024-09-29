<!--
 * @Description:
-->
<template>
  <Col v-bind="colPropsComputed" style="width: 100% !important">
    <div
      v-if="
        ['showItem', 'showItem_action', 'container', 'containerItem', 'gridContainer'].includes(
          schema.type,
        )
      "
      :class="{
        'm-1': true,
        ['jc-' + (schema.compAlign || 'center')]: true,
        'item-container': true,
      }"
    >
      <component
        class="mr-2"
        :is="componentItem"
        v-bind="{ ...cmpProps, ...asyncProps }"
        :schema="schema"
        :formConfig="formConfig"
        :formModel="cur_formModel"
        :formData="cur_formModel"
        :setFormModel="cur_setFormModel"
        :subFormType="subFormType"
        @change="handleChange"
        @click="handleClick(schema)"
        :getParent="() => proxy"
        :debug="debug"
        ref="formItemRef"
        >{{ schema.component == 'Button' ? schema.label : '' }}</component
      >
      <span class="item-icon">
        <Icon
          v-if="subFormType == 'gridSubForm'"
          icon="ant-design:eye-invisible-outlined"
          @click="$emit('subItemHide')"
      /></span>
    </div>
    <div v-else class="item-container">
      <FormItem v-bind="{ ...formItemProps }" style="margin-right: 5px" class="mt-3">
        <template
          #label
          v-if="
            !hiddenLabel &&
            !formItemProps.hiddenLabel &&
            schema.component !== 'Divider' &&
            parentComp != 'SubForm'
          "
        >
          <Tooltip>
            <span>{{ schema.label }}</span>
            <template #title v-if="schema.helpMessage"
              ><span>{{ schema.helpMessage }}</span></template
            >
            <Icon
              v-if="schema.helpMessage"
              class="ml-5"
              icon="ant-design:question-circle-outlined"
            />
          </Tooltip>
        </template>

        <slot
          v-if="schema.componentProps && schema.componentProps?.slotName"
          :name="schema.componentProps.slotName"
          v-bind="schema"
        ></slot>
        <Divider
          v-else-if="schema.component == 'Divider' && schema.label && !formItemProps.hiddenLabel"
          >{{ schema.label }}</Divider
        >
        <!-- 部分控件需要一个空div -->
        <div v-else
          ><component
            class="v-form-item-wrapper"
            :is="componentItem"
            v-bind="{ ...cmpProps, ...asyncProps }"
            :schema="schema"
            :formConfig="formConfig"
            :formData="cur_formModel"
            :setFormModel="cur_setFormModel"
            :getFormItem="getFormItem"
            @change="handleChange"
            @click="handleClick(schema)"
            :debug="debug"
            ref="formItemRef"
            :getParent="() => proxy"
        /></div>
      </FormItem>
      <span class="item-icon">
        <Icon
          v-if="subFormType == 'gridSubForm'"
          icon="ant-design:eye-invisible-outlined"
          @click="$emit('subItemHide')"
      /></span>
    </div>
  </Col>
</template>
<script lang="ts">
  import { type Recordable } from '@vben/types';
  import {
    inject,
    defineComponent,
    reactive,
    toRefs,
    computed,
    PropType,
    unref,
    getCurrentInstance,
    ref,
    onMounted,
  } from 'vue';
  import { componentMap } from '../../core/formItemConfig';
  import { IVFormComponent, IFormConfig } from '../../typings/v-form-component';
  import { asyncComputed } from '@vueuse/core';
  import { handleAsyncOptions, formModelToData } from '../../utils';
  import {
    omit,
    isArray,
    forOwn,
    isFunction,
    get,
    set,
    template,
    isUndefined,
    isNull,
    isNil,
  } from 'lodash-es';
  import { Tooltip, FormItem, Divider, Col } from 'ant-design-vue';
  import Icon from '@c/Icon/Icon.vue';
  import { useFormModelState } from '../../hooks/useFormDesignState';
  import { widget } from '../../extention/loader';
  import { string } from 'vue-types';

  export default defineComponent({
    name: 'VFormItem',
    components: {
      Tooltip,
      Icon,
      FormItem,
      Divider,
      Col,
    },

    props: {
      formModel: {
        type: Object,
        default: () => ({}),
      },
      formData: {
        type: Object,
        default: () => ({}),
      },
      schema: {
        type: Object as PropType<IVFormComponent>,
        required: true,
      },
      isRender: {
        type: Boolean,
        default: false,
      },
      formConfig: {
        type: Object as PropType<IFormConfig>,
        required: true,
      },
      setFormModel: {
        type: Function as PropType<(key: string, value: any) => void>,
        default: null,
      },
      subFormType: {
        type: String,
        default: null,
      },
      hiddenLabel: {
        type: Boolean,
        default: false,
      },
      parentComp: {
        type: String,
        default: '',
      },
      debug: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:formModel', 'change'],

    setup(props, { emit }) {
      const state = reactive({
        componentMap,
        formItemRef: null,
        // formItemRef2: null,
      });
      //const myState = reactive({ formItemRef: null });

      // let formItemRef;
      //     const formItemRef2 = ref(null);
      const { formModel, setFormModel } = useFormModelState();
      // const formData1 = computed(() => {
      //   return formModelToData(formModel.value);
      // });

      const cur_formModel =
        !isNil(props.subFormType) && !!props.formModel ? props.formModel : formModel;
      // console.log(cur_formModel);

      //  const cur_formData = props.inSubForm ? ref(props.formData) : formData1;
      //  const cur_formData =cur_formModel

      const cur_setFormModel = isNil(props.subFormType) ? setFormModel : props.setFormModel;
      const iconShow = () => !!props.subFormType;
      const formItemRefList: any = inject('formItemRefList', null); //lintg
      const { proxy } = getCurrentInstance();
      if (formItemRefList) formItemRefList[props.schema.field!] = proxy;
      const getFormItem = (name) => {
        return formItemRefList[name || props.schema.field!];
      };
      const getFormMethods = inject('formMethods', () => {});
      const getFormModel = () => unref(cur_formModel);
      const getFormData = () => unref(cur_formModel);
      const getValue = () => {
        return formModel.value[props.schema.field!];
        //return get(unref(cur_formData), props.schema.field);
      };
      const setValue = (value) => {
        cur_setFormModel(props.schema.field!, value);
        // set(cur_formData.value, props.schema.field, value);
      };

      const getModal = (name) => {
        return getFormItem(name).formItemRef;
        //   const formItem = getFormItem(name);
        //   return formItem.formItemRef || formItem.formItemRef2;
        //   return myState.formItemRef.$.exposed;
        //  return formItemRefList[name || props.schema.field!].formItemRef;
      };
      const getItemRef = (name) => {
        return getFormItem(name).formItemRef;
        //const formItem = getFormItem(name);
        // return formItem.formItemRef || formItem.formItemRef2;
        //  return formItemRefList[name || props.schema.field!].formItemRef;
      };
      const getFormRef = inject('getFormRef', () => {});
      const watchKey = new Set();
      const bindFunc = () => {
        //     console.log('bind:', props.schema.componentProps);
        forOwn(props.schema.componentProps, (value: any, key) => {
          if (isFunction(value)) {
            props.schema.componentProps[key] = value.bind(proxy);
            watchKey.add(key);
          }
        });
        forOwn(props.schema.on, (value: any, key) => {
          if (isFunction(value)) {
            props.schema.componentProps![key] = value.bind(proxy);
            watchKey.add(key);
          }
        });
      };
      const formatTpl = (param) => {
        if (!props.schema.componentProps![param + '__tpl']) return;
        const formModel = toRaw(unref(cur_formModel));
        let context = { ...props.schema.componentProps!['defaultContext'], ...formModel };
        context = formModelToData(formModel); //lintg
        let paramStr = template(props.schema.componentProps![param + '__tpl'])(context);
        myProps.value[param] = eval('(' + paramStr + ')');
        return myProps.value[param];
      };

      const colPropsComputed = computed(() => {
        const { colProps = {} } = props.schema;
        return props.parentComp == 'SubForm' || !props.isRender ? {} : colProps; //lintg
      });
      const formItemProps = computed(() => {
        const { formConfig } = unref(props);
        let { field, required, rules, labelCol, wrapperCol } = unref(props.schema);
        const { colon } = props.formConfig;

        const { itemProps } = unref(props.schema);

        //<editor-fold desc="布局属性">
        labelCol = labelCol
          ? labelCol
          : formConfig.layout === 'horizontal'
            ? formConfig.labelLayout === 'flex'
              ? { style: `width:${formConfig.labelWidth}px` }
              : formConfig.labelCol
            : {};

        wrapperCol = wrapperCol
          ? wrapperCol
          : formConfig.layout === 'horizontal'
            ? formConfig.labelLayout === 'flex'
              ? { style: 'width:auto;flex:1' }
              : formConfig.wrapperCol
            : {};

        const style =
          formConfig.layout === 'horizontal' && formConfig.labelLayout === 'flex'
            ? { display: 'flex' }
            : {};
        //  itemProps.hidden = eval(itemProps.hideCondition) ?? itemProps.hidden; //lintg
        /**
         * 将字符串正则格式化成正则表达式
         */

        const newConfig = Object.assign(
          {},
          {
            name: field,
            style: { ...style },
            colon,
            required,
            rules,
            labelCol,
            wrapperCol,
          },
          itemProps,
        );
        if (!itemProps?.labelCol?.span) {
          newConfig.labelCol = labelCol;
        }
        if (!itemProps?.wrapperCol?.span) {
          newConfig.wrapperCol = wrapperCol;
        }
        if (!itemProps?.rules) {
          newConfig.rules = rules;
        }
        return newConfig;
      }) as Recordable<any>;

      const componentItem = computed(() =>
        props.isRender ||
        !['gridContainer', 'container', 'containerItem'].includes(props.schema.type)
          ? componentMap.get(props.schema.component as string)
          : widget[props.schema.component],
      );

      // console.log('component change:', props.schema.component, componentItem.value);
      const handleClick = (schema: IVFormComponent) => {
        if (schema.component === 'Button' && schema.componentProps?.handle)
          emit(schema.componentProps?.handle);
      };
      /**
       * 处理异步属性，异步属性会导致一些属性渲染错误，如defaultValue异步加载会导致渲染不出来，故而此处只处理options，treeData，同步属性在cmpProps中处理
       */
      const asyncProps = asyncComputed(async () => {
        let { options, treeData } = props.schema.componentProps ?? {};
        if (options) options = await handleAsyncOptions(options);
        if (treeData) treeData = await handleAsyncOptions(treeData);
        const result = {};
        if (options?.length > 0) {
          result.options = options;
        }
        if (treeData?.length > 0) {
          result.treeData = treeData;
        }
        return result;
      });

      /**
       * 处理同步属性
       */
      const myProps = ref({});
      const cmpProps = computed(() => {
        //   performance.mark('props-start');
        let omitObj: any[] = [];
        for (let item in props.schema.componentProps) {
          if (item.endsWith('__func') || item.endsWith('__params') || item.endsWith('__tpl'))
            omitObj.push(item);
        }
        let result = omit(props.schema.componentProps, omitObj);
        //   reuslt.options=props?.options?[props.schema.field]||[]
        const isCheck =
          props.schema && ['Switch', 'Checkbox', 'Radio'].includes(props.schema.component);
        let { field } = props.schema;

        let { disabled, ...attrs } = omit(result, ['options', 'treeData']) ?? {};

        disabled = props.formConfig.disabled || disabled;
        if (!isNil(disabled)) myProps.value['disabled'] = disabled;
        //console.log(cur_formModel);
        // if (
        //   !['showItem', 'showItem_action', 'container', 'gridContainer'].includes(props.schema.type)
        // ) {
        // const fieldValue = unref(cur_formModel)[props.schema.field!];
        // myProps.value[isCheck ? 'checked' : 'value'] = fieldValue;
        //   }

        return {
          ...attrs,
          [isCheck ? 'checked' : 'value']: unref(cur_formModel)[props.schema.field!],
          ...myProps.value,
        };
      });

      const handleChange = function (e) {
        if (['container', 'gridContainer', 'showItem'].includes(props.schema.type)) return;
        // if (['Tabs', 'Card', 'Modal', 'Drawer'].includes(props.schema.component)) return;
        const isCheck = ['Switch', 'Checkbox', 'Radio'].includes(props.schema.component);
        const target = e ? e.target : null;
        const value = target ? (isCheck ? target.checked : target.value) : e;

        if (['GridSubForm', 'SubForm'].includes(props.schema.component) && !isArray(value)) return;
        //props.formModel[props.schema.field] = value;

        cur_setFormModel(props.schema.field!, value, e);
        if (!isNil(props.subFormType)) emit('change', value);
        if (isFunction(props.schema?.componentProps?.change)) {
          props.schema?.componentProps?.change(value); //调用配置的change函数
        }
      };
      onMounted(() => {
        state.formItemRef?.init?.();
      });

      return {
        ...toRefs(state),
        formItemRefList,
        componentItem,
        formItemProps,
        handleClick,
        asyncProps,
        cmpProps,
        handleChange,
        colPropsComputed,
        widget,
        getFormItem,
        getValue,
        getFormData,
        getFormModel,
        getFormRef,
        getModal,
        cur_setFormModel,
        cur_formModel,
        //   cur_formData,
        getFormMethods,
        setValue,
        iconShow,
        hidden: (flag) => getFormMethods()?.hidden(props.schema.field, flag),

        bindFunc,
        getItemRef,
        formatTpl,
        proxy,
      };
    },
  });
</script>

<style lang="less" scoped>
  .ml-5 {
    margin-left: 5px;
  }

  // form字段中的标签有ant-col，不能使用width:100%
  :deep(.ant-col) {
    width: auto;
  }

  .ant-form-item:not(.ant-form-item-with-help) {
    margin-bottom: 20px;
  }

  .item-container {
    position: relative;
    margin-bottom: 0;
  }

  .item-container .item-icon {
    //visibility: hidden;
    display: none; /* 默认隐藏 */
    position: absolute;
    top: -5px; /* 调整图标位置 */
    right: 5px; /* 调整图标位置 */
    cursor: pointer;
  }

  .item-container:hover .item-icon {
    //visibility: visible;
    display: block; /* 鼠标悬停时显示 */
  }
</style>
