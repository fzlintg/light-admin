<!--
 * @Description:
-->
<template>
  <Col v-bind="colPropsComputed" style="width: 100% !important">
    <div
      v-if="['showItem', 'container', 'containerItem'].includes(schema.type)"
      :class="{ 'm-2': true, ['jc-' + (schema.compAlign || 'center')]: true }"
    >
      <component
        class="mr-2"
        :is="componentItem"
        v-bind="{ ...cmpProps, ...asyncProps }"
        :schema="schema"
        :formConfig="formConfig"
        :formData="cur_formModel"
        :setFormModel="cur_setFormModel"
        @change="handleChange"
        @click="handleClick(schema)"
        ref="formItemRef"
        >{{ schema.component == 'Button' ? schema.label : '' }}
      </component>
    </div>
    <div v-else class="item-container">
      <FormItem v-bind="{ ...formItemProps }" style="margin-right: 20px">
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
            @change="handleChange"
            @click="handleClick(schema)"
            ref="formItemRef"
        /></div>
      </FormItem>
      <span class="item-icon">
        <Icon
          v-if="inSubForm"
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
    ref,
    defineComponent,
    reactive,
    toRefs,
    computed,
    PropType,
    unref,
    getCurrentInstance,
  } from 'vue';
  import { componentMap } from '../../core/formItemConfig';
  import { IVFormComponent, IFormConfig } from '../../typings/v-form-component';
  import { asyncComputed } from '@vueuse/core';
  import { handleAsyncOptions, formModelToData } from '../../utils';
  import { omit, isArray, forOwn, isFunction, get, set } from 'lodash-es';
  import { Tooltip, FormItem, Divider, Col } from 'ant-design-vue';
  import Icon from '@c/Icon/Icon.vue';
  import { useFormModelState } from '../../hooks/useFormDesignState';
  import { widget } from '../../extention/loader';

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
      inSubForm: {
        type: Boolean,
        default: false,
      },
      hiddenLabel: {
        type: Boolean,
        default: false,
      },
      parentComp: {
        type: String,
        default: '',
      },
    },
    emits: ['update:form-data', 'change'],

    setup(props, { emit }) {
      const state = reactive({
        componentMap,
        formItemRef: null,
      });

      const { formModel, setFormModel } = useFormModelState();
      // const formData1 = computed(() => {
      //   return formModelToData(formModel.value);
      // });
      const cur_formModel = props.inSubForm && !!props.formModel ? props.formModel : formModel;
      //  const cur_formData = props.inSubForm ? ref(props.formData) : formData1;
      //  const cur_formData =cur_formModel
      const cur_setFormModel = props.inSubForm ? props.setFormModel : setFormModel;

      const formItemRefList: any = inject('formItemRefList', null); //lintg
      const { proxy } = getCurrentInstance();
      if (formItemRefList) formItemRefList[props.schema.field!] = proxy;
      const getFormItem = (name) => {
        return formItemRefList[name];
      };
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
        return formItemRefList[name].formItemRef;
      };
      const getFormRef = inject('getFormRef', () => {});

      forOwn(props.schema.componentProps, (value: any, key) => {
        if (isFunction(value)) {
          props.schema.componentProps![key] = value.bind(proxy);
        }
      });
      forOwn(props.schema.on, (value: any, key) => {
        //  debugger;
        if (isFunction(value)) {
          props.schema.componentProps![key] = value.bind(proxy);
        }
      });
      const colPropsComputed = computed(() => {
        const { colProps = {} } = props.schema;
        return props.parentComp == 'SubForm' ? {} : colProps; //lintg
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
        props.isRender || !['container', 'containerItem'].includes(props.schema.type)
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
        // return {
        //   options,
        //   treeData,
        // };
      });

      /**
       * 处理同步属性
       */
      const cmpProps = computed(() => {
        //   performance.mark('props-start');
        const isCheck =
          props.schema && ['Switch', 'Checkbox', 'Radio'].includes(props.schema.component);
        let { field } = props.schema;

        let { disabled, ...attrs } =
          omit(props.schema.componentProps, ['options', 'treeData']) ?? {};

        disabled = props.formConfig.disabled || disabled;

        let result = {
          ...attrs,
          disabled,
          [isCheck ? 'checked' : 'value']: unref(cur_formModel)[field!],
        };
        // performance.mark('props-end');
        // performance.measure('props', 'props-start', 'props-end');
        return result;
      });

      const handleChange = function (e) {
        if (['container', 'showItem'].includes(props.schema.type)) return;
        // if (['Tabs', 'Card', 'Modal', 'Drawer'].includes(props.schema.component)) return;
        const isCheck = ['Switch', 'Checkbox', 'Radio'].includes(props.schema.component);
        const target = e ? e.target : null;
        const value = target ? (isCheck ? target.checked : target.value) : e;

        if (['GridSubForm', 'SubForm'].includes(props.schema.component) && !isArray(value)) return;
        //props.formModel[props.schema.field] = value;
        cur_setFormModel(props.schema.field!, value, e);

        // if (props.inSubForm) {
        //   e.stopPropagation();
        //   debugger;
        // }
        // debugger;
        //  if (!props.inSubForm) emit('change', value);
      };
      return {
        ...toRefs(state),
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
        getFormRef,
        getModal,
        cur_setFormModel,
        cur_formModel,
        //   cur_formData,
        setValue,
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
    margin-bottom: 20px;
  }

  .item-container .item-icon {
    display: none; /* 默认隐藏 */
    position: absolute;
    top: -5px; /* 调整图标位置 */
    right: 5px; /* 调整图标位置 */
    cursor: pointer;
  }

  .item-container:hover .item-icon {
    display: block; /* 鼠标悬停时显示 */
  }
</style>
