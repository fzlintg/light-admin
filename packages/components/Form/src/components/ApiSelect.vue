<template>
  <Select
    @dropdown-visible-change="handleFetch"
    v-bind="$attrs"
    @change="handleChange"
    :options="getOptions"
    v-model:value="state"
    :mode="allowInput ? 'SECRET_COMBOBOX_MODE_DO_NOT_USE' : ''"
    @search="search"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </Select>
</template>
<script lang="ts" setup>
  import { PropType, ref, computed, unref, watch, onMounted, getCurrentInstance } from 'vue';
  import { Select, Input } from 'ant-design-vue';
  import type { SelectValue } from 'ant-design-vue/es/select';
  import { isFunction } from '@utils/is';
  import { useRuleFormItem } from '@h/component/useFormItem';
  import { get, omit, isEqual, cloneDeep } from 'lodash-es';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '@h/web/useI18n';
  import { propTypes } from '@utils/propTypes';
  import { defHttp as axios } from '@utils/http/axios';
  import { useRequest } from '@vben/hooks';

  type OptionsItem = { label?: string; value?: string; disabled?: boolean; [name: string]: any };

  defineOptions({ name: 'ApiSelect', inheritAttrs: false });

  const props = defineProps({
    value: { type: [Array, Object, String, Number] as PropType<SelectValue> },
    numberToString: propTypes.bool,
    api: {
      type: Function as PropType<(arg?: any) => Promise<OptionsItem[] | Recordable<any>>>,
      default: null,
    },
    // api params
    params: propTypes.any.def({}),
    // support xxx.xxx.xx
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    immediate: propTypes.bool.def(true),
    alwaysLoad: propTypes.bool.def(false),
    options: {
      type: Array<OptionsItem>,
      default: [],
    },
    beforeFetch: {
      type: Function as PropType<Fn>,
      default: null,
    },
    afterFetch: {
      type: Function as PropType<Fn>,
      default: null,
    },
    onSearch: {
      type: Function as PropType<Fn>,
      default: null,
    },
    getParent: {
      type: Function as PropType<Fn>,
      default: null,
    },
    allowInput: {
      type: Boolean,
      default: false,
    },
  });

  // const search = props?.onSearch?.bind(props.parent) || (() => {});
  const search = (...args) => {
    props?.onSearch.call(props.getParent(), ...args);
  };

  const emit = defineEmits(['options-change', 'change', 'update:value']);

  const optionsRef = ref<OptionsItem[]>([]);

  const loading = ref(false);
  // 首次是否加载过了
  const isFirstLoaded = ref(false);
  const emitData = ref<OptionsItem[]>([]);
  const { t } = useI18n();

  // Embedded in the form, just use the hook binding to perform form verification
  const [state] = useRuleFormItem(props, 'value', 'change', emitData);
  const { run } = useRequest(async (params = null) => fetch(params), {
    debounceWait: 100,
    manual: true,
  });
  // let paramsWait = null;
  const getOptions = computed(() => {
    let { labelField, valueField, numberToString } = props;
    labelField = labelField == '' ? 'label' : labelField;
    valueField = valueField == '' ? 'value' : valueField;
    let data = unref(optionsRef).reduce((prev, next: any) => {
      if (next) {
        const value = get(next, valueField);
        prev.push({
          ...omit(next, [labelField, valueField]),
          label: get(next, labelField),
          value: numberToString ? `${value}` : value,
        });
      }
      return prev;
    }, [] as OptionsItem[]);
    return data.length > 0 ? data : props.options;
  });

  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
    },
  );

  watch(
    () => props.params,
    (value, oldValue) => {
      if (isEqual(value, oldValue)) return;
      fetch();
    },
    { deep: true, immediate: props.immediate },
  );

  async function fetch(v_params: any = null) {
    let { api, beforeFetch, afterFetch, params, resultField } = props;
    // if (loading.value && v_params)
    //   paramsWait = cloneDeep(v_params); //缓存
    // else paramsWait = null; //最后一次
    v_params = v_params || params;
    //预存

    if (!api || !isFunction(api) || loading.value) return;
    // optionsRef.value.slice(0, 0);
    try {
      loading.value = true;
      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(v_params)) || params;
      }
      let res = await api(v_params);
      // let res = await api({ ...params, context: { axios } });
      if (afterFetch && isFunction(afterFetch)) {
        res = (await afterFetch(res)) || res;
      }
      isFirstLoaded.value = true;
      if (Array.isArray(res)) {
        optionsRef.value = res;
        emitChange();
        return;
      } else if (resultField) {
        optionsRef.value = get(res, resultField) || [];
      }
      emitChange();
    } catch (error) {
      console.warn(error);
      // reset status
      isFirstLoaded.value = false;
    } finally {
      loading.value = false;
    }

    // if (paramsWait) {
    //   await fetch(paramsWait);
    // }
  }

  async function handleFetch(visible: boolean) {
    if (visible) {
      if (props.alwaysLoad) {
        //await run();
        await fetch();
      } else if (!props.immediate && !unref(isFirstLoaded)) {
        //await run();
        await fetch();
      }
    }
  }

  function emitChange() {
    emit('options-change', unref(getOptions));
  }

  function handleChange(_, ...args) {
    emitData.value = args;
  }
  defineExpose({ fetch, run });
  // onMounted(() => {
  //   emit('loaded');
  // });
</script>
