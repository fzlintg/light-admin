<template>
  <div>
    <div class="copy-btn-box">
      <a-button
        @click="handleCopyJson"
        type="primary"
        class="copy-btn"
        data-clipboard-action="copy"
        :data-clipboard-text="editorJson"
      >
        复制数据
      </a-button>
      <a-button @click="handleExportJson" class="copy-btn" type="primary">导出代码</a-button>

      <a-button @click="handleClose" type="primary">关闭</a-button>
    </div>
    <div class="v-json-box">
      <CodeEditor :value="editorJson" ref="myEditor" mode="javascript" :height="500" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { CodeEditor, MODE } from '@c/CodeEditor';

  import { copyText } from '@utils/copyTextToClipboard';
  import { useMessage } from '@h/web/useMessage';

  export default defineComponent({
    name: 'PreviewCode',
    components: {
      CodeEditor,
    },
    props: {
      fileFormat: {
        type: String,
        default: 'json',
      },
      editorJson: {
        type: String,
        default: '',
      },
    },
    setup(props, { emit }) {
      const state = reactive({
        visible: false,
      });

      const exportData = (data: string, fileName = `file.${props.fileFormat}`) => {
        let content = 'data:text/csv;charset=utf-8,';
        content += data;
        const encodedUri = encodeURI(content);
        const actions = document.createElement('a');
        actions.setAttribute('href', encodedUri);
        actions.setAttribute('download', fileName);
        actions.click();
      };
      const handleClose = () => {
        emit('close');
      };
      const handleExportJson = () => {
        exportData(props.editorJson);
      };

      const { createMessage } = useMessage();

      const handleCopyJson = () => {
        // 复制数据
        const value = props.editorJson;
        if (!value) {
          createMessage.warning('代码为空！');
          return;
        }
        copyText(value);
      };

      return {
        ...toRefs(state),
        exportData,
        handleCopyJson,
        handleExportJson,
        handleClose,
        MODE,
      };
    },
  });
</script>

<style lang="less" scoped>
  // modal复制按钮样式
  .copy-btn-box {
    padding-top: 8px;
    padding-bottom: 10px;
    text-align: center;

    .copy-btn {
      margin-right: 8px;
    }
  }
</style>
