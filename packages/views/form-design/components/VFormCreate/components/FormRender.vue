<template>
  <template v-if="['Grid'].includes(schema.component)">
    <Row class="grid-row">
      <Col
        class="grid-col"
        v-for="(colItem, index) in schema.columns"
        :key="index"
        :span="colItem.span"
      >
        <FormRender
          v-for="(item, k) in colItem.children"
          :key="k"
          :schema="item"
          :formData="formData"
          :formConfig="formConfig"
          :setFormModel="setFormModel"
        />
      </Col>
    </Row>
  </template>
  <template v-else-if="schema.component == 'Tabs'">
    <Tabs class="mx-3 w100">
      <TabPane v-for="(colItem, index) in schema.columns" :key="index" :tab="colItem.label">
        <FormRender
          v-for="(item, k) in colItem.children"
          :key="k"
          :schema="item"
          :formData="formData"
          :formConfig="formConfig"
          :setFormModel="setFormModel"
        />
      </TabPane>
    </Tabs>
  </template>
  <template v-else-if="schema.component == 'Card'">
    <Card v-bind="schema.componentProps" class="mx-3 w100">
      <template #extra>hi</template>
      <template  v-for="(value,key,index) in schema.componentProps!.slotName"
      v-if="schema.componentProps && schema.componentProps.slotName"
      #extra
    >hi
     {{value}}
    </template>
      <FormRender
        v-for="(item, k) in schema.children"
        :key="k"
        :schema="item"
        :formData="formData"
        :formConfig="formConfig"
        :setFormModel="setFormModel"
      />
    </Card>
  </template>
  <VFormItem
    v-else
    :formConfig="formConfig"
    :schema="schema"
    :formData="formData"
    :setFormModel="setFormModel"
    @change="$emit('change', { schema: schema, value: $event })"
    @submit="$emit('submit', schema)"
    @reset="$emit('reset')"
  >
    <template
      v-if="schema.componentProps && schema.componentProps.slotName"
      #[schema.componentProps!.slotName]
    >
      <slot :name="schema.componentProps!.slotName"></slot>
    </template>
  </VFormItem>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IVFormComponent, IFormConfig } from '../../../typings/v-form-component';
  import VFormItem from '../../VFormItem/index.vue';
  import { Row, Col, Tabs, TabPane, Card } from 'ant-design-vue';

  export default defineComponent({
    name: 'FormRender',
    components: {
      VFormItem,
      Row,
      Col,
      Tabs,
      TabPane,
      Card,
    },
    props: {
      formData: {
        type: Object,
        default: () => ({}),
      },
      schema: {
        type: Object as PropType<IVFormComponent>,
        default: () => ({}),
      },
      formConfig: {
        type: Object as PropType<IFormConfig>,
        default: () => [] as IFormConfig[],
      },
      setFormModel: {
        type: Function as PropType<(key: string, value: any) => void>,
        default: null,
      },
    },
    emits: ['change', 'submit', 'reset'],
    setup(_props) {},
  });
</script>

<style>
  .v-form-render-item {
    overflow: hidden;
  }
</style>
