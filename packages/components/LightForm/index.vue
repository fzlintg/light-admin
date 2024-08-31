<template>
  <div
    :class="{ componentContainer: true, hide: hide }"
    @mouseover="showRefreshIcon"
    @mouseleave="hideRefreshIcon"
  >
    <VFormCreate
      v-bind="$attrs"
      :form-config="formConfig"
      v-model:fApi="fApi"
      v-model:formModel="state"
      ref="vformRef"
      @submit="onSubmit"
      v-if="loaded"
    />
    <div class="refresh-icon" v-if="isMouseOver && debug" @click="refresh">
      <Icon icon="ant-design:reload-outlined" :size="10" />
      <!-- 使用Font Awesome图标库中的刷新图标 -->
    </div>
  </div>
</template>
<script setup>
  import { cloneDeep } from 'lodash-es';
  import VFormCreate from '@views/form-design/components/VFormCreate/index.vue';
  import logicJson from '@/loader.ts';

  import { formatRules } from '@views/form-design/utils/index.ts';
  import { nextTick, onMounted, ref } from 'vue';
  import { defHttp as axios } from '@utils/http/axios';
  import { useRuleFormItem } from '@h/component/useFormItem';

  const loaded = ref(false);
  const props = defineProps({
    logic: {
      type: String,
      default: '',
    },
    remote: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    formModel: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    debug: {
      type: Boolean,
      default: false,
    },
  });
  const formConfig = ref(null),
    fApi = ref(null),
    // vformModel = ref(props.formModel),
    vformRef = ref(null),
    isMouseOver = ref(false);
  const [state] = useRuleFormItem(props, 'formModel', 'update:formModel');
  const [logic] = useRuleFormItem(props, 'logic', 'update:logic');
  // watch(
  //   () => state.value,
  //   (newValue) => {
  //     debugger;
  //   },
  // );
  //const firstLoad = ref(true);
  const onSubmit = () => {};

  onMounted(async () => {
    if (!loaded.value) {
      await loadData();
      loaded.value = true;
    }
  });
  watch(
    () => props.logic,
    async () => {
      await refresh();
      //   handleRefresh();
    },
  );
  // const lock = ref(false);
  const loadData = async () => {
    if (logic.value == '') return;

    let jsonData;
    if (!props.remote && logicJson[logic.value]) {
      jsonData = cloneDeep(logicJson[logic.value]);
    } else {
      jsonData = await axios.post({ url: `/api/logic/getLogicConfig/${logic.value}` });
    }
    formatRules(jsonData.schemas);

    formConfig.value = jsonData;
  };
  const showRefreshIcon = () => {
    isMouseOver.value = true;
  };
  const hideRefreshIcon = () => {
    isMouseOver.value = false;
  };
  const refresh = (logicValue) => {
    if (logicValue) logic.value = logicValue;
    // 处理刷新逻辑
    loaded.value = false;
    nextTick(async () => {
      await loadData();
      loaded.value = true;

      //   console.log(state.value);
    });
  };
  defineExpose({ vformRef, getFormRef: () => vformRef.value, refresh });
</script>
<style scoped>
  .component-container {
    position: relative;

    /* 其他样式 */
  }

  .refresh-icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .hide {
    width: 0;
  }
</style>
