<template>
  <Layout>
    <LayoutSider
      :class="` left ${prefixCls}-sider`"
      collapsible
      collapsedWidth="0"
      width="270"
      :zeroWidthTriggerStyle="{
        'margin-top': '-60px',
        color: 'black',
        'background-color': 'transparent',
      }"
      breakpoint="md"
    >
      <div class="sidebar" style="padding-bottom: 60px">
        <CollapseContainer :title="item.name" v-for="(item, key) in formItemConfig" :key="key">
          <CollapseItem
            :list="item.schema"
            :handleListPush="handleListPushDrag"
            @add-attrs="handleAddAttrs"
            @handle-list-push="handleListPush"
          />
        </CollapseContainer>
        <div style="height: 20px"></div>
      </div>
    </LayoutSider>
    <LayoutContent>
      <Toolbar
        @handle-open-json-modal="handleOpenModal(jsonModal!)"
        @handle-open-import-json-modal="handleOpenModal(importJsonModal!)"
        @handle-preview="handleOpenModal(eFormPreview!)"
        @handle-preview2="handleOpenModal(eFormPreview2!)"
        @handle-open-code-modal="handleOpenModal(codeModal!)"
        @handle-clear-form-items="handleClearFormItems"
        @handle-save-form-items="handleSaveFormItems"
        ref="toolbarRef"
      />
      <FormComponentPanel
        :current-item="formConfig.currentItem"
        :data="formConfig"
        @handle-set-select-item="handleSetSelectItem"
      />
    </LayoutContent>
    <LayoutSider
      :class="`right ${prefixCls}-sider`"
      collapsible
      :reverseArrow="true"
      collapsedWidth="0"
      width="280"
      :zeroWidthTriggerStyle="{
        'margin-top': '-60px',
        color: 'black',
        'background-color': 'transparent',
      }"
      breakpoint="lg"
    >
      <div class="sidebar mx-2">
        <PropsPanel ref="propsPanel" :activeKey="formConfig.activeKey">
          <template v-for="item of formConfig.schemas" #[`${item.component}Props`]="data">
            <slot
              :name="`${item.component}Props`"
              v-bind="{ formItem: data, props: data.componentProps }"
            ></slot>
          </template>
        </PropsPanel>
        <div style="height: 60px"></div>
      </div>
    </LayoutSider>
  </Layout>

  <JsonModal ref="jsonModal" />
  <CodeModal ref="codeModal" />
  <ImportJsonModal ref="importJsonModal" />
  <VFormPreview ref="eFormPreview" :formConfig="formConfig" />
  <VFormPreview2 ref="eFormPreview2" :formConfig="formConfig" />
</template>

<script lang="ts" setup>
  import CollapseItem from './modules/CollapseItem.vue';
  import FormComponentPanel from './modules/FormComponentPanel.vue';
  import JsonModal from './components/JsonModal.vue';
  import VFormPreview from '../VFormPreview/index.vue';
  import VFormPreview2 from '../VFormPreview/useForm.vue';
  import PropsPanel from './modules/PropsPanel.vue';
  import ImportJsonModal from './components/ImportJsonModal.vue';
  import CodeModal from './components/CodeModal.vue';

  import 'codemirror/mode/javascript/javascript';

  import { ref, provide, Ref, computed, onMounted, defineAsyncComponent } from 'vue';
  import { Layout, LayoutContent, LayoutSider } from 'ant-design-vue';

  import { IVFormComponent, IFormConfig, PropsTabKey } from '../../typings/v-form-component';
  import { formItemsForEach, generateKey, getQueryParam } from '../../utils';
  import { cloneDeep, pick } from 'lodash-es';
  //import { baseComponents, customComponents, layoutComponents } from '../../core/formItemConfig';
  import { formItemConfig } from '../../core/formItemConfig';
  import { useRefHistory, UseRefHistoryReturn } from '@vueuse/core';
  import { globalConfigState } from './config/formItemPropsConfig';
  import { IFormDesignMethods, IPropsPanel, IToolbarMethods } from '../../typings/form-type';
  import { useDesign } from '@h/web/useDesign';

  import { CollapseContainer } from '@c/Container';
  //import { useMessage } from '@h/web/useMessage';
  import { defHttp as axios } from '@utils/http/axios';
  import formJson from '../../json/formConfig';
  import Toolbar from './modules/Toolbar.vue';
  //const Toolbar = defineAsyncComponent(async () => import('./modules/Toolbar.vue'));
  defineProps({
    title: {
      type: String,
      default: 'light-form表单设计器',
    },
  });
  const { prefixCls } = useDesign('form-design');
  // 子组件实例
  const propsPanel = ref<null | IPropsPanel>(null);
  const jsonModal = ref<null | IToolbarMethods>(null);
  const importJsonModal = ref<null | IToolbarMethods>(null);
  const eFormPreview = ref<null | IToolbarMethods>(null);
  const eFormPreview2 = ref<null | IToolbarMethods>(null);

  const codeModal = ref<null | IToolbarMethods>(null);
  const toolbarRef = ref();
  // const { createMessage } = useMessage();
  const logic = ref(null);
  //add by lintg

  const formModel = ref({});
  // endregion
  const formConfig = ref<IFormConfig>(formJson);

  const setFormConfig = (config: IFormConfig) => {
    //外部导入时，可能会缺少必要的信息。
    config.schemas = config.schemas || [];
    config.schemas.forEach((item) => {
      item.colProps = item.colProps || { span: 24 };
      item.componentProps = item.componentProps || {};
      item.itemProps = item.itemProps || {};
      item.width = item.width || '300px'; //lintg
    });
    formConfig.value = config as any;
  };
  // 获取历史记录，用于撤销和重构
  const historyReturn = useRefHistory(formConfig as any, {
    deep: true,
    capacity: 20,
    parse: (val: IFormConfig) => {
      // 使用lodash.cloneDeep重新拷贝数据，把currentItem指向选中项
      const formConfig = cloneDeep(val);
      const { currentItem, schemas } = formConfig;
      // 从formItems中查找选中项

      const item = schemas && schemas.find((item) => item.key === currentItem?.key);
      // 如果有，则赋值给当前项，如果没有，则切换属性面板
      if (item) {
        formConfig.currentItem = item;
      }
      return formConfig;
    },
  });

  /**
   * 选中表单项
   * @param schema 当前选中的表单项
   */
  const handleSetSelectItem = (schema: IVFormComponent) => {
    formConfig.value.currentItem = schema as any;
    handleChangePropsTabs(
      schema.key ? (formConfig.value.activeKey! === 1 ? 2 : formConfig.value.activeKey!) : 1,
    );
  };

  const setGlobalConfigState = (formItem: IVFormComponent) => {
    formItem.colProps = formItem.colProps || { span: globalConfigState.span };
    //   formItem.colProps.span = globalConfigState.span;
    // console.log('setGlobalConfigState', formItem);
  };

  /**
   * 添加属性
   * @param schemas
   * @param index
   */
  const handleAddAttrs = (_formItems: IVFormComponent[], _index: number) => {};

  const handleListPushDrag = (item: IVFormComponent) => {
    const formItem = cloneDeep(item);
    formItem.width = formItem.width || '200px'; //lintg
    setGlobalConfigState(formItem);
    //    formItem.colProps.span = colSpan;
    //    console.log('drag,colspan', colSpan);
    generateKey(formItem);

    return formItem;
  };
  /**
   * 单击控件时添加到面板中
   * @param item {IVFormComponent} 当前点击的组件
   */
  const handleListPush = (item: IVFormComponent) => {
    // console.log('handleListPush', item);
    const formItem = cloneDeep(item);

    formItem.width = formItem.width || '200px'; //lintg
    setGlobalConfigState(formItem);
    //formItem.colProps.span = colSpan;
    //console.log('colspan!!', colSpan);
    generateKey(formItem);
    if (!formConfig.value.currentItem?.key) {
      handleSetSelectItem(formItem);
      //   formConfig.value.schemas && formConfig.value.schemas.push(formItem as any);
      formConfig.value.schemas?.push(formItem as any);

      return;
    }
    handleCopy(formItem, false);
  };

  /**
   * 复制表单项，如果表单项为栅格布局，则遍历所有自表单项重新生成key
   * @param {IVFormComponent} formItem
   * @return {IVFormComponent}
   */
  const copyFormItem = (formItem: IVFormComponent) => {
    const newFormItem = cloneDeep(formItem);
    if (['container', 'gridContainer', 'containerItem'].includes(newFormItem.type)) {
      formItemsForEach([formItem], (item) => {
        generateKey(item);
      });
    }
    return newFormItem;
  };
  /**
   * 复制或者添加表单，isCopy为true时则复制表单
   * @param item {IVFormComponent} 当前点击的组件
   * @param isCopy {boolean} 是否复制
   */
  const handleCopy = (
    item: IVFormComponent = formConfig.value.currentItem as IVFormComponent,
    isCopy = true,
  ) => {
    const key = formConfig.value.currentItem?.key;
    /**
     * 遍历当表单项配置，如果是复制，则复制一份表单项，如果不是复制，则直接添加到表单项中
     * @param schemas
     */
    const traverse = (schemas: IVFormComponent[]) => {
      // 使用some遍历，找到目标后停止遍历
      schemas.some((formItem: IVFormComponent, index: number) => {
        if (formItem.key === key) {
          // 判断是不是复制
          isCopy
            ? schemas.splice(index, 0, copyFormItem(formItem))
            : schemas.splice(index + 1, 0, item);
          const event = {
            newIndex: index + 1,
          };
          // 添加到表单项中
          handleBeforeColAdd(event, schemas, isCopy);
          return true;
        }
        //lintg
        else if (formItem.type == 'gridContainer') {
          // 栅格布局
          formItem.columns?.forEach((item) => {
            traverse(item.children);
          });
        } else if (
          ['container', 'containerItem'].includes(formItem.type)
          // ['Tab', 'SubForm', 'GridSubForm', 'Modal', 'Drawer',''].includes(formItem.component)
        ) {
          // 栅格布局
          traverse(formItem.children || []);
        }
      });
    };
    if (formConfig.value.schemas) {
      traverse(formConfig.value.schemas as any);
    }
  };

  /**
   * 添加到表单中
   * @param newIndex {object} 事件对象
   * @param schemas {IVFormComponent[]} 表单项列表
   * @param isCopy {boolean} 是否复制
   */
  const handleBeforeColAdd = ({ newIndex }: any, schemas: IVFormComponent[], isCopy = false) => {
    const item = schemas[newIndex];
    isCopy && generateKey(item);
    handleSetSelectItem(item);
  };

  /**
   * 打开模态框
   * @param Modal {IToolbarMethods}
   */
  const handleOpenModal = (Modal: IToolbarMethods) => {
    const config = cloneDeep(formConfig.value);
    Modal?.showModal(config);
  };
  /**
   * 切换属性面板
   * @param key
   */
  const handleChangePropsTabs = (key: PropsTabKey) => {
    formConfig.value.activeKey = key;
  };
  /**
   * 清空表单项列表
   */
  const handleClearFormItems = ({ cache, logic }) => {
    formConfig.value.schemas = [];
    if (logic) {
      window.localStorage.setItem(`light_form_widget${cache}`, JSON.stringify(formConfig.value));
      window.localStorage.setItem(`light_form_logic${cache}`, JSON.stringify(logic.value));
    }
    handleSetSelectItem({ component: '' });
  };

  const handleSaveFormItems = () => {
    let cache = getQueryParam('cache') || '';
    window.localStorage.setItem(`light_form_widget${cache}`, JSON.stringify(formConfig.value));
    toolbarRef.value.saveLogic(formConfig.value, cache);
  };
  // const handleNewFormItems = () => {
  //   toolbarRef.value.newForm(formConfig.value, cache);
  // };
  // const handleSettings = () => {
  //   toolbarRef.value.openSetting();
  // };
  // const handleOpenLogic = () => {
  //   toolbarRef.value.openLogic();
  // };

  const setFormModel = (key, value) => (formModel.value[key] = value);
  provide('formModel', formModel);
  // 把祖先组件的方法项注入到子组件中，子组件可通过inject获取
  provide<(key: String, value: any) => void>('setFormModelMethod', setFormModel);
  // region 注入给子组件的属性
  // provide('currentItem', formConfig.value.currentItem)

  // 把表单配置项注入到子组件中，子组件可通过inject获取，获取到的数据为响应式
  provide<Ref<IFormConfig>>('formConfig', formConfig as any);

  // 注入历史记录
  provide<UseRefHistoryReturn<any, any>>('historyReturn', historyReturn);

  // 把祖先组件的方法项注入到子组件中，子组件可通过inject获取
  provide<IFormDesignMethods>('formDesignMethods', {
    handleBeforeColAdd,
    handleCopy,
    handleListPush,
    handleSetSelectItem,
    handleAddAttrs,
    setFormConfig,
  });
  provide('logic', logic);
  onMounted(async () => {
    let name = getQueryParam('name');
    let cache = getQueryParam('cache') || '';
    let formWidget;
    if (name) {
      let result = await axios.post({
        url: '/api/crud/query/base/page',
        data: { where: { name } },
      });
      if (!result) return;
      formWidget = result?.items?.[0]?.config;
      logic.value = pick(result?.items?.[0], ['id', 'title', 'name']);

      //    console.log('logic provide', logic);
      //window.localStorage.setItem(`light_form_logic${cache}`, JSON.stringify(logic));
    } else {
      formWidget = JSON.parse(window.localStorage.getItem(`light_form_widget${cache}`));
    }
    //自动读取本地缓存

    if (formWidget) {
      formItemsForEach(formWidget.schemas, (formItem) => {
        generateKey(formItem, false);
      });
      formConfig.value = { ...formConfig.value, ...formWidget };
    }
  });

  // endregion
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-form-design';

  [data-theme='dark'] {
    .@{prefix-cls}-sider {
      background-color: #1f1f1f;
    }
  }

  [data-theme='light'] {
    .@{prefix-cls}-sider {
      background-color: #fff;
    }
  }

  .sidebar {
    // height: calc(100vh - 78px);
    height: 100vh;
    overflow: auto;
    overflow-x: hidden;
  }
</style>
