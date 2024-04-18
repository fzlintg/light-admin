<!--
 * @Description: 渲染JSON数据
-->
<template>
  <Modal
    title="JSON数据"
    :footer="null"
    :open="visible"
    @cancel="handleCancel"
    :destroyOnClose="true"
    wrapClassName="v-code-modal"
    style="top: 20px"
    width="850px"
  >
    <PreviewCode :editorJson="editorJson" @close="visible = false" />
  </Modal>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue';
  import PreviewCode from './PreviewCode.vue';
  import { IFormConfig } from '../../../typings/v-form-component';
  import { formatRules, removeAttrs, formatItemFunc } from '../../../utils';
  import { Modal } from 'ant-design-vue';

  export default defineComponent({
    name: 'JsonModal',
    components: {
      PreviewCode,
      Modal,
    },
    emits: ['cancel'],
    setup(_props, { emit }) {
      const state = reactive<{
        visible: boolean;
        jsonData: IFormConfig;
      }>({
        visible: false, // 控制json数据弹框显示
        jsonData: {} as IFormConfig, // json数据
      });
      /**
       * 显示Json数据弹框
       * @param jsonData
       */
      const showModal = (jsonData: IFormConfig) => {
        formatRules(jsonData.schemas);
        state.jsonData = jsonData as any;
        state.visible = true;
      };

      // 计算json数据
      const editorJson = computed(() => {
        // @ts-ignore
        let jsonData = removeAttrs(state.jsonData);
        formatItemFunc(jsonData);
        function replaceQuotes(match, group) {
          var replacedStr = group.replace(/\\"/g, '"').replace(/\\n/g, ' \n '); // 替换含有\"为“
          return '`' + replacedStr + '`';
        }
        jsonData = JSON.stringify(jsonData, null, '\t').replace(
          /"\$_begin(.*?)\$_end"/g,
          replaceQuotes,
        ); //好不容易修改成  lintg

        return 'export default ' + jsonData;
      });

      // 关闭弹框
      const handleCancel = () => {
        state.visible = false;
        emit('cancel');
      };

      return { ...toRefs(state), editorJson, handleCancel, showModal };
    },
  });
</script>
