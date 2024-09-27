<template>
  <Codemirror
    v-model="code"
    placeholder="输入代码"
    :style="{ height: attrs.height + 'px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
  />
</template>

<script setup>
  import { computed, defineComponent, ref, shallowRef } from 'vue';
  import { Codemirror } from 'vue-codemirror';
  import { javascript } from '@codemirror/lang-javascript';
  import { json } from '@codemirror/lang-json';
  import { html } from '@codemirror/lang-html';
  import { sql } from '@codemirror/lang-sql';
  //import { basicSetup } from 'codemirror'
  import { oneDark } from '@codemirror/theme-one-dark';

  const attrs = reactive(useAttrs());

  const code = ref(attrs.value);
  //const [code] = useRuleFormItem(attrs, 'value', 'change');
  watch(
    () => attrs.value,
    () => {
      code.value = attrs.value;
    },
  );
  const modeMap = { javascript, json, html, sql };
  const extensions = computed(() => {
    let mode = modeMap[attrs.mode] ? modeMap[attrs.mode] : json;
    const result = [mode()];
    if (attrs.theme == 'dark') {
      result.push(oneDark);
    }
    return result;
  });
  const view = shallowRef();
  const handleReady = (payload) => {
    view.value = payload.view;
  };

  // Status is available at all times via Codemirror EditorView
  const getCodemirrorStates = () => {
    const state = view.value.state;
    const ranges = state.selection.ranges;
    const selected = ranges.reduce((r, range) => r + range.to - range.from, 0);
    const cursor = ranges[0].anchor;
    const length = state.doc.length;
    const lines = state.doc.lines;
    // more state info ...
    // return ...
  };

  // return {
  //   code,
  //   extensions,
  //   handleReady,
  //   log: console.log
  // }
  //  }
  // })
</script>
