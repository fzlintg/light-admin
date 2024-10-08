<template>
  <Tree v-bind="getAttrs" v-model:selectedKeys="state" v-if="loading">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Tree>
</template>

<script lang="ts" setup>
  import { type Recordable } from '@vben/types';
  import { type PropType, computed, watch, ref, onMounted, unref, useAttrs, nextTick } from 'vue';
  import { Tree, TreeProps } from 'ant-design-vue';
  import { isFunction } from '@utils/is';
  import { get, omit } from 'lodash-es';
  import { DataNode } from 'ant-design-vue/es/tree';
  import { useRuleFormItem } from '@h/component/useFormItem';

  defineOptions({ name: 'ApiTree' });

  const props = defineProps({
    api: { type: Function as PropType<(arg?: any) => Promise<Recordable<any>>> },
    params: { type: Object },
    immediate: { type: Boolean, default: true },
    resultField: { type: String, default: '' },
    beforeFetch: {
      type: Function as PropType<Fn>,
      default: null,
    },
    afterFetch: {
      type: Function as PropType<Fn>,
      default: null,
    },
    value: {
      type: Array as PropType<TreeProps['selectedKeys']>,
    },
  });

  const emit = defineEmits(['options-change', 'change', 'update:value']);

  const attrs = useAttrs();
  const myAttrs = ref({});
  const treeData = ref<DataNode[]>([]);
  const isFirstLoaded = ref<Boolean>(false);
  const loading = ref(false);
  const emitData = ref<any[]>([]);

  const [state] = useRuleFormItem(props, 'value', 'change', emitData);
  const getAttrs = computed(() => {
    return {
      ...(props.api ? { treeData: unref(treeData) } : {}),
      ...omit(attrs, ['checkable']),
      ...myAttrs.value,
    };
  });

  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
    },
  );

  watch(
    () => props.params,
    () => {
      !unref(isFirstLoaded) && fetch();
    },
    { deep: true },
  );

  watch(
    () => props.immediate,
    (v) => {
      v && !isFirstLoaded.value && fetch();
    },
  );

  onMounted(() => {
    props.immediate && fetch();
  });
  const refresh = (compProps) => {
    loading.value = false;
    Object.assign(attrs.schema.componentProps, unref(compProps));
    //Object.assign(myAttrs.value, unref(compProps));
    nextTick(() => {
      loading.value = true;
    });
  };
  defineExpose({ refresh });
  async function fetch(v_params: any = null) {
    let { api, beforeFetch, afterFetch, params, resultField } = props;
    v_params = v_params || params;
    if (!api || !isFunction(api)) return;
    loading.value = true;
    treeData.value = [];
    let res;
    try {
      if (beforeFetch && isFunction(beforeFetch)) {
        v_params = (await beforeFetch(v_params)) || v_params;
      }
      res = await api(v_params);
      if (afterFetch && isFunction(afterFetch)) {
        res = (await afterFetch(res)) || res;
      }
    } catch (e) {
      console.error(e);
    }
    // loading.value = false;
    if (!res) return;
    if (resultField) {
      res = get(res, resultField) || [];
    }
    treeData.value = (res as (Recordable & { key: string | number })[]) || [];
    isFirstLoaded.value = true;
    emit('options-change', treeData.value);
  }
</script>
