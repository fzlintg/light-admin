<!--
 * @Description: 导入JSON模板
-->
<template>
  <Modal
    title="JSON数据"
    :open="visible"
    @ok="handleImportJson"
    @cancel="handleCancel"
    cancelText="关闭"
    :destroyOnClose="true"
    wrapClassName="v-code-modal"
    style="top: 20px"
    :width="850"
  >
    <p class="hint-box">数据可直接编辑再导入:</p>
    <div class="v-json-box">
      <CodeEditor v-model="json" ref="myEditor" mode="json" />
    </div>

    <template #footer>
      <a-checkbox v-model:checked="ifInitKey">初始化键值</a-checkbox>
      <a-button
        @click="handleCopyJson"
        type="link"
        class="copy-btn"
        data-clipboard-action="copy"
        :data-clipboard-text="json"
      >
        复制
      </a-button>
      <a-button @click="handleExportJson" class="copy-btn" type="link">导出</a-button>

      <Upload
        class="upload-button"
        :beforeUpload="beforeUpload"
        :showUploadList="false"
        accept="application/json"
      >
        <a-button type="link">文件导入</a-button>
      </Upload>
      <a-button type="primary" @click="handleImportJson">导入</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </template>
  </Modal>
</template>
<script lang="ts">
  import { computed, defineComponent, inject, reactive, toRefs } from 'vue';
  // import message from '../../../utils/message';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  // import { codemirror } from 'vue-codemirror-lite';
  // import { IFormConfig } from '../../../typings/v-form-component';
  import { importJSON, TransJSonToTs, removeAttrs, formatRules } from '../../../utils';
  //import {  MODE,CodeEditor } from '@c/EditorCode/index';
  import { CodeEditor } from '@c/CodeEditor';
  //import CodeEditor from "@c/EditorCode/Editor.vue"
  import { useMessage } from '@h/web/useMessage';
  import { copyText } from '@utils/copyTextToClipboard';
  import {
    Upload,
    Modal,
    Checkbox as ACheckbox,
    RadioGroup as ARadioGroup,
    RadioButton as ARadioButton,
  } from 'ant-design-vue';

  export default defineComponent({
    name: 'ImportJsonModal',
    components: {
      CodeEditor,
      Upload,
      Modal,
      ACheckbox,
    },
    setup() {
      const { createMessage } = useMessage();
      // const editorJson = computed(() => {
      //   // @ts-ignore
      //   let jsonData = removeAttrs(state.jsonData);
      //   return 'export default ' + TransJSonToTs(jsonData);
      // });

      const logic = inject('logic');
      const getEditorJson = (json) => {
        let jsonData = removeAttrs(json);
        return 'export default ' + TransJSonToTs(jsonData);
      };
      const handleCopyJson = () => {
        // 复制数据
        const value = state.json;
        if (!value) {
          createMessage.warning('代码为空！');
          return;
        }
        copyText(value);
      };

      const state = reactive({
        //      dataType: 'json',
        ifInitKey: false,
        visible: false,
        json: '',
        jsonData: {
          schemas: {},
          config: {},
        },
        handleSetSelectItem: null,
      });
      const { formDesignMethods } = useFormDesignState();
      const handleCancel = () => {
        state.visible = false;
      };
      // const showModal = () => {
      //   state.visible = true;
      // };
      const showModal = (jsonData: IFormConfig) => {
        formatRules(jsonData.schemas);
        state.jsonData = jsonData as any;
        state.json = getEditorJson(state.jsonData);
        state.visible = true;
      };

      const handleImportJson = () => {
        // 导入JSON
        try {
          // const regex = /^export\s+default\s+/;
          // const editorJsonData = new Function('return ' + state.json.replace(regex, ''))();
          // //const editorJsonData = JSON.parse(state.json) as IFormConfig;
          // editorJsonData.schemas &&
          //   formItemsForEach(editorJsonData.schemas, (formItem) => {
          //     generateKey(formItem, state.ifInitKey);
          //   });
          // formDesignMethods.setFormConfig({
          //   ...editorJsonData,
          //   activeKey: 1,
          //   currentItem: { component: '' },
          // });
          const config = importJSON(state.json, state.ifInitKey);
          formDesignMethods.setFormConfig(config);
          handleCancel();
          createMessage.success('导入成功');
        } catch {
          createMessage.error('导入失败，数据格式不对');
        }
      };
      const beforeUpload = (e: File) => {
        // 通过json文件导入
        const reader = new FileReader();
        reader.readAsText(e);
        reader.onload = function () {
          state.json = this.result as string;
          handleImportJson();
        };
        return false;
      };
      const exportData = (data: string, fileName = `file.json`) => {
        let content = 'data:text/csv;charset=utf-8,';
        content += data;
        const encodedUri = encodeURI(content);
        const actions = document.createElement('a');
        actions.setAttribute('href', encodedUri);
        actions.setAttribute('download', fileName);
        actions.click();
      };
      const handleExportJson = () => {
        exportData(state.json, (logic?.value?.name || 'jsonSchema') + '.ts');
      };
      return {
        handleExportJson,
        handleImportJson,
        beforeUpload,
        handleCancel,
        showModal,
        ...toRefs(state),
      
        handleCopyJson,
      };
    },
  });
</script>

<style lang="less" scoped>
  .upload-button {
    margin: 0 10px;
  }
</style>
