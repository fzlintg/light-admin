<!--
 * @Description: 右侧属性面板控件 表单属性面板
-->
<template>
  <div class="properties-content">
    <Icon
      @click="patchSchemas"
      icon="ant-design:tool-outlined"
      :size="15"
      title="组件修复"
      class="text-gray hand"
    />
    <Form class="properties-body" label-align="left" layout="vertical">
      <!--      <e-upload v-model="fileList"></e-upload>-->

      <FormItem label="表单布局">
        <RadioGroup button-style="solid" v-model:value="formConfig.layout">
          <RadioButton value="horizontal">水平</RadioButton>
          <RadioButton value="vertical" :disabled="formConfig.labelLayout === 'Grid'">
            垂直
          </RadioButton>
          <RadioButton value="inline" :disabled="formConfig.labelLayout === 'Grid'">
            行内
          </RadioButton>
        </RadioGroup>
      </FormItem>

      <!-- <Row> -->
      <FormItem label="标签布局">
        <RadioGroup
          buttonStyle="solid"
          v-model:value="formConfig.labelLayout"
          @change="lableLayoutChange"
        >
          <RadioButton value="flex">固定</RadioButton>
          <RadioButton value="Grid" :disabled="formConfig.layout !== 'horizontal'">
            栅格
          </RadioButton>
        </RadioGroup>
      </FormItem>

      <!-- </Row> -->
      <FormItem label="标签宽度（px）" v-show="formConfig.labelLayout === 'flex'">
        <InputNumber
          :style="{ width: '100%' }"
          v-model:value="formConfig.labelWidth"
          :min="0"
          :step="1"
        />
      </FormItem>
      <div v-if="formConfig.labelLayout === 'Grid'">
        <FormItem label="labelCol">
          <Slider v-model:value="sliderSpan" :max="24" />
        </FormItem>
        <FormItem label="wrapperCol">
          <Slider v-model:value="sliderSpan" :max="24" />
        </FormItem>

        <FormItem label="标签对齐">
          <RadioGroup button-style="solid" v-model:value="formConfig.labelAlign">
            <RadioButton value="left">靠左</RadioButton>
            <RadioButton value="right">靠右</RadioButton>
          </RadioGroup>
        </FormItem>

        <FormItem label="控件大小">
          <RadioGroup button-style="solid" v-model:value="formConfig.size">
            <RadioButton value="default">默认</RadioButton>
            <RadioButton value="small">小</RadioButton>
            <RadioButton value="large">大</RadioButton>
          </RadioGroup>
        </FormItem>
      </div>

      <FormItem label="表单属性">
        <Col
          ><Checkbox v-model:checked="formConfig.colon" v-if="formConfig.layout == 'horizontal'"
            >label后面显示冒号</Checkbox
          ></Col
        >
        <Col><Checkbox v-model:checked="formConfig.disabled">禁用</Checkbox></Col>
        <Col><Checkbox v-model:checked="formConfig.hideRequiredMark">隐藏必选标记</Checkbox></Col>
      </FormItem>
    </Form>

    <light-form
      logic="system.ds.edit"
      :formModel="formConfig"
      debug
      @update:form-model="updateFormModel"
    />
    <light-form logic="system.tab.ai" @load-schemas="loadSchemas" />
  </div>
</template>
<script lang="ts" setup name="FormProps">
  import { computed } from 'vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import {
    InputNumber,
    Slider,
    Checkbox,
    Col,
    RadioChangeEvent,
    Form,
    FormItem,
    RadioButton,
    RadioGroup,
  } from 'ant-design-vue';
  import { formItemsForEach, importJSON } from '@views/form-design/utils';
  import { schemas } from '../../../extention/loader';
  import { useMessage } from '@h/web/useMessage';

  const { formConfig } = useFormDesignState();
  const { createMessage } = useMessage();

  formConfig.value = formConfig.value || {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const lableLayoutChange = (e: RadioChangeEvent) => {
    if (e.target.value === 'Grid') {
      formConfig.value.layout = 'horizontal';
    }
  };

  const sliderSpan = computed(() => {
    if (formConfig.value.labelLayout) {
      return Number(formConfig.value.labelCol!.span);
    }
    return 0;
  });
  const patchSchemas = () => {
    formItemsForEach(formConfig.value.schemas, (schema) => {
      let originSchema = schemas[schema.type || 'custom'].schema.find(
        (item) => item.component == schema.component,
      );
      if (originSchema) {
        schema.componentProps = { ...originSchema.componentProps, ...schema.componentProps };
        for (const name in originSchema.componentProps) {
          if (name.endsWith('__params'))
            //params以配置为准
            schema.componentProps[name] = originSchema.componentProps[name];
        }
      }
    });
    formConfig.value = { ds: [], ...formConfig.value };

    createMessage.success('修正完成');
  };
  const loadSchemas = (schemas) => {
    let schemaData = importJSON(JSON.stringify(schemas), true);
    formConfig.value = schemaData;
  };
  const updateFormModel = (ds) => {
    Object.assign(formConfig.value, ds);
  };
</script>
