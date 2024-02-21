<template>
  <a-button @click="openModal"> 编辑 </a-button>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="代码编辑"
    @open-change="handleShow"
    @ok="handleOk"
  >
    <CodeEditor v-model:value="value" :mode="modeValue" />
  </BasicModal>
</template>
<script setup>
  import { CodeEditor, MODE } from '@c/CodeEditor';
  import { BasicModal, useModalInner, useModal } from '@c/Modal';

  const loading = ref(true);
  const lines = ref(10);
  //const [, { setModalProps, redoModalHeight }] = useModalInner();
  const [register, { openModal, closeModal }] = useModal();
  const modeValue = ref < MODE > MODE.JSON;
  const value = ref('');
  const handleOk = () => {
    closeModal();
  };
  const handleShow = () => {
    // setModalProps({
    //   title: '代码编辑器',
    //   width: 1000,
    //   centered: true,
    //   maskClosable: true,
    //   okText: '确定',
    //   cancelText: '取消',
    //   onOk: () => {
    //     redoModalHeight();
    //   },
    // });
    // loading.value = true;
    // setTimeout(() => {
    //   loading.value = false;
    // });
  };
</script>
