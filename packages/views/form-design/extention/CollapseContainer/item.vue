<template>
  <CollapseContainer v-bind="attrs.schema.componentProps" class="w-full">
    <template #[key] v-for="(value, key) in attrs.schema.componentProps?.slots">
      {{ value }}
    </template>
    <VFormItem
      isRender
      :inSubForm="attrs.inSubForm"
      v-for="(item, k) in attrs.schema.children"
      :key="k"
      :schema="item"
      :formConfig="attrs.formConfig"
      @change="handleChange({ schema: attrs.schema, value: $event })"
      :formModel="cur_formModel"
      :formData="cur_formModel"
      :setFormModel="cur_setFormModel"
    />
  </CollapseContainer>
</template>
<script setup lang="ts">
  import VFormItem from '../../components/VFormItem/index.vue';
  import { useFormModelState } from '../../hooks/useFormDesignState';
  import { CollapseContainer } from '@c/Container';

  // const { schema, formData, formConfig, setFormModel } = toRefs(useAttrs());

  const attrs = useAttrs();
  const { formModel, setFormModel } = useFormModelState();

  const cur_formModel = attrs.inSubForm && !!attrs.formModel ? attrs.formModel : formModel;

  const cur_setFormModel = attrs.inSubForm ? attrs.setFormModel : setFormModel;

  const handleChange = function (e) {
    if (['container', 'showItem'].includes(attrs.schema.type)) return;
    // if (['Tabs', 'Card', 'Modal', 'Drawer'].includes(props.schema.component)) return;
    const isCheck = ['Switch', 'Checkbox', 'Radio'].includes(attrs.schema.component);
    const target = e ? e.target : null;
    const value = target ? (isCheck ? target.checked : target.value) : e;

    if (['GridSubForm', 'SubForm'].includes(attrs.schema.component) && !isArray(value)) return;
    //props.formModel[props.schema.field] = value;
    cur_setFormModel(attrs.schema.field!, value, e);
    if (!attrs.inSubForm) emit('change', value);
  };
</script>
