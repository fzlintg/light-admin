<template>
  <div
    class="relative !h-full w-full overflow-hidden"
    :class="{ 'ant-input': props.bordered, 'css-dev-only-do-not-override-kqecok': props.bordered }"
    ref="el"
  ></div>
</template>

<script lang="ts" setup>
  import {
    type PropType,
    ref,
    onMounted,
    onUnmounted,
    watchEffect,
    watch,
    unref,
    nextTick,
  } from 'vue';
  import type { Nullable } from '@vben/types';
  import { useWindowSizeFn } from '@vben/hooks';
  import { useDebounceFn } from '@vueuse/core';
  import { useAppStore } from '@store/modules/app';
  import CodeMirror from 'codemirror';
  import type { EditorConfiguration } from 'codemirror';
  import { MODE, parserDynamicImport } from './../typing';
  // css
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/idea.css';
  import 'codemirror/theme/material-palenight.css';
  import 'codemirror/addon/selection/active-line.js'; // 选中行高亮 add by lintg
  // modes
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/mode/sql/sql';
  import 'codemirror/mode/css/css';
  import 'codemirror/mode/htmlmixed/htmlmixed';
  import '@codemirror/commands';

  // 代码段折叠功能
  import 'codemirror/addon/fold/foldgutter.css';
  import 'codemirror/addon/fold/foldcode.js';
  import 'codemirror/addon/fold/foldgutter';
  import 'codemirror/addon/fold/brace-fold';
  import 'codemirror/addon/fold/comment-fold';
  import 'codemirror/addon/fold/markdown-fold';
  import 'codemirror/addon/fold/xml-fold';
  import 'codemirror/addon/fold/indent-fold';

  const props = defineProps({
    mode: {
      type: String as PropType<MODE>,
      default: MODE.JSON,
      validator(value: any) {
        // 这个值必须匹配下列字符串中的一个
        return Object.values(MODE).includes(value);
      },
    },
    value: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    config: { type: Object as PropType<EditorConfiguration>, default: () => {} },
    height: { type: Number, default: 300 },
  });

  const emit = defineEmits(['change']);

  const el = ref();
  let editor: Nullable<CodeMirror.Editor>;
  const refresh = () => {
    editor?.refresh();
  };
  const debounceRefresh = useDebounceFn(refresh, 100);
  const appStore = useAppStore();

  watch(
    () => props.value,
    async (value) => {
      await nextTick();
      const oldValue = editor?.getValue();
      if (value !== oldValue) {
        editor?.setValue(value ? value : '');
      }
    },
    { flush: 'post' },
  );

  watchEffect(async () => {
    await parserDynamicImport(props.mode)();
    editor?.setOption('mode', props.mode);
  });

  watch(
    () => appStore.getDarkMode,
    async () => {
      setTheme();
    },
    {
      immediate: true,
    },
  );
  watch(
    () => props.height,
    async () => {
      editor?.setSize(null, props.height);
    },
    {
      immediate: true,
    },
  );

  function setTheme() {
    unref(editor)?.setOption(
      'theme',
      appStore.getDarkMode === 'light' ? 'idea' : 'material-palenight',
    );
  }

  const formatCode = () => {
    editor.execCommand('selectAll');
    editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
  };
  async function init() {
    const addonOptions = {
      autoCloseBrackets: true,
      autoCloseTags: true,
      foldGutter: true,
      gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      //gutters: ['CodeMirror-linenumbers'],
      styleActiveLine: true,
      // extraKeys: {
      //   'Alt-F': (cm) => {
      //     formatCode();
      //   },
      // },
    };

    editor = CodeMirror(el.value!, {
      value: '',
      mode: props.mode,
      readOnly: props.readonly,
      tabSize: 2,
      theme: 'material-palenight',
      lineWrapping: true,
      lineNumbers: true,
      ...addonOptions,
      ...props.config,
    });
    editor?.setSize(null, props.height);
    editor?.setValue(props.value);
    setTheme();
    editor?.on('change', () => {
      emit('change', editor?.getValue());
    });
    setTimeout(() => {
      refresh();
    }, 200);

    //format(CodeMirror);
  }

  onMounted(async () => {
    await nextTick();
    await init();

    useWindowSizeFn(debounceRefresh);
  });

  onUnmounted(() => {
    editor = null;
  });
  defineExpose({ formatCode });
</script>
