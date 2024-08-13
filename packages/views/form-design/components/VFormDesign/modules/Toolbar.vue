<!--
 * @Description: 工具栏
-->
<template>
  <div class="operating-area">
    <!-- 头部操作按钮区域 start -->
    <!-- 操作左侧区域 start -->

    <div class="left-btn-box">
      <Tooltip v-for="item in toolbarsConfigs" :title="item.title" :key="item.icon">
        <a @click="itemEmit(item)" class="toolbar-text" v-if="!item.mode || (item.mode && mode)">
          <Icon :icon="item.icon" />
        </a>
      </Tooltip>

      <Tooltip title="撤销">
        <a :class="{ disabled: !canUndo }" :disabled="!canUndo" @click="undo">
          <Icon icon="ant-design:undo-outlined" />
        </a>
      </Tooltip>
      <Tooltip title="重做">
        <a :class="{ disabled: !canRedo }" :disabled="!canRedo" @click="redo">
          <Icon icon="ant-design:redo-outlined" />
        </a>
      </Tooltip>
      <Tooltip title="新窗口" v-if="ifShowIcon">
        <a @click="openNew">
          <Icon icon="ant-design:send-outlined" />
        </a>
      </Tooltip>
    </div>
    <span class="d-flex ai-center">
      <a-tag
        v-if="logic.id"
        :title="logic.name"
        color="pink"
        class="hand"
        @click="copyText(logic.name)"
        >{{ logic.id }}</a-tag
      >
      <edit-text v-if="logic.title" v-model:value="logic.title" defaultValue="test" />
      <light-form
        logic="system.toolbar.setting"
        ref="settingFormRef"
        @load-schemas="loadSchemas"
        hide
      />
    </span>
  </div>
  <!-- 操作区域 start -->
</template>
<script lang="ts">
  import { defineComponent, inject, onMounted, reactive, toRefs } from 'vue';
  import { UseRefHistoryReturn } from '@vueuse/core';
  import { IFormConfig } from '../../../typings/v-form-component';
  import { Tooltip, Divider, Tag as ATag, Input as AInput } from 'ant-design-vue';
  import Icon from '@c/Icon/Icon.vue';
  import EditText from '../../../extention/EditText/comp.vue';
  import { useAppStore } from '@store/modules/app';
  import { useMessage } from '@h/web/useMessage';
  import { pick } from 'lodash-es';
  import { getQueryParam, clearUrlParam } from '../../../utils';
  import { copyText } from '@utils/copyTextToClipboard';

  // import 'url-search-params-polyfill';
  // import { getQueryParam } from '../../../utils';

  interface IToolbarsConfig {
    type: string;
    title: string;
    icon: string;
    event: string;
    mode?: boolean;
  }

  export default defineComponent({
    name: 'OperatingArea',
    components: {
      Tooltip,
      Icon,
      Divider,
      ATag,
      EditText,
    },
    setup(props, { emit }) {
      const { createMessage } = useMessage();
      const appStore = useAppStore();
      const mode = computed(() => {
        return appStore.getLightFormConfig.mode;
      });

      let cache = getQueryParam('cache') || '';
      const logic = inject('logic');
      logic.value = logic.value ||
        JSON.parse(localStorage.getItem(`light_form_logic${cache}`)) || {
          id: null,
          name: '',
          title: '',
        };

      const state = reactive<{
        settingFormRef: any;
        toolbarsConfigs: IToolbarsConfig[];
        ifShowIcon: Boolean;
        //   logic: { id: Number; title: String; name: String };
      }>({
        ifShowIcon: true,
        settingFormRef: null,
        //      logic: logic.value,
        toolbarsConfigs: [
          {
            title: '预览-支持布局',
            type: 'preview',
            event: 'handlePreview',
            icon: 'ant-design:chrome-filled',
          },
          {
            title: '预览-不支持布局',
            type: 'preview',
            event: 'handlePreview2',
            icon: 'ant-design:chrome-filled',
          },
          {
            title: '导入JSON',
            type: 'importJson',
            event: 'handleOpenImportJsonModal',
            icon: 'ant-design:import-outlined',
          },
          {
            title: '生成JSON',
            type: 'exportJson',
            event: 'handleOpenJsonModal',
            icon: 'ant-design:export-outlined',
          },
          {
            title: '生成代码',
            type: 'exportCode',
            event: 'handleOpenCodeModal',
            icon: 'ant-design:code-filled',
          },
          {
            title: '清空',
            type: 'reset',
            event: 'handleClearFormItems',
            icon: 'ant-design:clear-outlined',
          },
          {
            title: '新增',
            type: 'localEvent',
            event: 'handleNewFormItems',
            mode: true,
            icon: 'ant-design:plus-outlined',
          },
          {
            title: '载入服务',
            type: 'localEvent',
            event: 'openLogic',
            mode: true,
            icon: 'ant-design:folder-open-outlined',
          },
          {
            title: '保存',
            type: 'save',
            event: 'handleSaveFormItems',
            icon: 'ant-design:save-outlined',
          },
          {
            title: '设置',
            type: 'localEvent',
            event: 'openSetting',
            icon: 'ant-design:setting-outlined',
          },
        ],
      });

      const historyRef = inject('historyReturn') as UseRefHistoryReturn<IFormConfig, IFormConfig>;
      const formConfig = inject('formConfig') as Ref<IFormConfig>;
      const itemEmit = (item) => {
        if (item.type == 'localEvent') localEvent[item.event]();
        else emit(item.event);
      };
      const localEvent = {
        openSetting: () => {
          let data = unref(appStore.getLightFormConfig);
          state.settingFormRef.getFormRef().getItemRef('drawer').show(data);
        },
        openLogic: () => {
          state.settingFormRef
            .getFormRef()
            .getItemRef('drawer_1')
            .show(pick(logic.value, ['name']), logic.value);
        },
        handleNewFormItems: () => {
          clearUrlParam('name');
          logic.value = {
            id: null,
            title: '',
            name: '',
          };
          emit('handleClearFormItems', { cache, logic });
        },
      };
      const saveLogic = (schemas, cache) => {
        window.localStorage.setItem(`light_form_logic${cache}`, JSON.stringify(logic.value));

        if (appStore.getLightFormConfig.mode) {
          state.settingFormRef.getFormRef().getItemRef('drawer_2').show(logic.value, schemas);
        } else createMessage.success('保存成功');
      };
      const loadSchemas = (schemas) => {
        formConfig.value = schemas;
      };

      const { undo, redo, canUndo, canRedo } = historyRef;
      const href = window.location.href.split('?');
      const host = href[0].split('#');
      const openNew = () => {
        let target = `${host[0]}#/formDesign`;
        if (href.length > 1) target += `?${href?.[1]}`;
        window.open(target);
      };

      onMounted(() => {
        if (host[1] == '/formDesign') state.ifShowIcon = false;
      });
      return {
        openNew,
        copyText,
        logic,
        ...toRefs(state),
        undo,
        redo,
        canUndo,
        canRedo,
        localEvent,
        itemEmit,
        mode,
        saveLogic,
        loadSchemas,
      };
    },
  });
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import url('../styles/variable.less');

  .operating-area {
    display: flex;
    height: @operating-area-height;
    padding: 0 12px;
    padding-left: 30px;
    border-bottom: 2px solid @border-color;
    font-size: 16px;
    line-height: @operating-area-height;
    text-align: left;
    place-content: center space-between;

    a {
      margin: 0 5px;
      color: #666;

      &.disabled,
      &.disabled:hover {
        color: #ccc;
      }

      &:hover {
        color: @primary-color;
      }

      > span {
        padding-left: 2px;
        font-size: 14px;
      }
    }
  }
</style>
