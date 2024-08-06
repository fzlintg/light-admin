<template>
  <div
    :class="{ componentContainer: true, hide: hide }"
    @mouseover="showRefreshIcon"
    @mouseleave="hideRefreshIcon"
  >
    <VFormCreate
      :form-config="formConfig"
      v-model:fApi="fApi"
      v-model:formModel="vformModel"
      ref="vformRef"
      @submit="onSubmit"
      v-if="loaded"
      v-bind="$attrs"
    />
    <div class="refresh-icon" v-if="isMouseOver" @click="handleRefresh">
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
  import { nextTick, onMounted } from 'vue';
  import { defHttp as axios } from '@utils/http/axios';

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
  });
  const formConfig = ref(null),
    fApi = ref(null),
    vformModel = ref(props.formModel),
    vformRef = ref(null),
    isMouseOver = ref(false);
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
      await loadData();
    },
  );
  const loadData = async () => {
    let jsonData;
    if (!props.remote && logicJson[props.logic]) {
      jsonData = cloneDeep(logicJson[props.logic]);
    } else {
      jsonData = await axios.post({ url: `/api/logic/getLogicData/${props.logic}` });
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
  const handleRefresh = () => {
    // 处理刷新逻辑
    loaded.value = false;
    nextTick(async () => {
      await loadData();
    });
  };
  defineExpose({ vformRef, getFormRef: () => vformRef.value });
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
