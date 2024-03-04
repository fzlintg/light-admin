<template>
  <div>
    <div v-for="(item, index) of formConfig.currentItem!['columns']" :key="index">
      <div class="options-box">
        <Input v-model:value="item.span" class="options-value" />
        <a class="options-delete" @click="deleteGridOptions(index)">
          <Icon icon="ant-design:delete-outlined" />
        </a>
      </div>
    </div>
    <a @click="addGridOptions">
      <Icon icon="ant-design:file-add-outlined" />
      添加{{ label }}
    </a>
  </div>
</template>
<script lang="ts" setup name="ItemOptions">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import { remove } from '../../../utils';
  import message from '../../../utils/message';
  import { Input } from 'ant-design-vue';
  import Icon from '@c/Icon/Icon.vue';
  import { useAttrs } from '@vben/hooks';

  const { formConfig } = useFormDesignState();
  const attrs = useAttrs();
  const { label } = attrs;
</script>
