<template>
  <PageWrapper
    title="基础表单"
    contentBackground
    content=" 表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    contentClass="p-4"
  >
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@c/Form';
  import { schemas } from './data';
  import { useMessage } from '@h/web/useMessage';
  import { PageWrapper } from '@c/Page';

  defineOptions({ name: 'FormBasicPage' });

  const { createMessage } = useMessage();
  const [register, { validate, setProps }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 15,
    },
    schemas: schemas,
    actionColOptions: {
      offset: 8,
      span: 23,
    },
    submitButtonOptions: {
      text: '提交',
    },
    submitFunc: customSubmitFunc,
  });

  async function customSubmitFunc() {
    try {
      await validate();
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      setTimeout(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
        createMessage.success('提交成功！');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 24px;
    background-color: @component-background;
  }
</style>
