<template>
  <div
    class="editable-tag ml-3 jc-start"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span v-if="!editing" :style="{ width: `${props.width}` }">{{ state }}</span>
    <Icon v-if="!editing && mouseHover" icon="ant-design:edit-outlined" @click="startEditing" />
    <a-input
      v-model:value="state"
      v-if="editing"
      ref="input"
      :style="{ width: `${props.width}` }"
    />
    <a-button-group v-if="editing" size="small" class="mt-2 ml-2 d-flex">
      <a-button type="dashed" @click="saveEdit">保存</a-button>
      <a-button type="dashed" @click="cancelEdit">取消</a-button>
    </a-button-group>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Input as AInput, Button as AButton, ButtonGroup as AButtonGroup } from 'ant-design-vue';
  import Icon from '@c/Icon/Icon.vue';
  import { propTypes } from '@utils/propTypes';
  import { useRuleFormItem } from '@h/component/useFormItem';

  const props = defineProps({
    value: propTypes.string,
    width: propTypes.String,
    defaultValue: propTypes.string,
  });
  const editing = ref(false),
    mouseHover = ref(false);
  // const attrs = useAttrs();
  const emit = defineEmits(['update:value']);
  const [state] = useRuleFormItem(props, 'value', 'change');
  state.value = props.defaultValue;
  const oldValue = ref(state.value);
  // watch(
  //   () => state.value,
  //   (v) => {
  //     emit('update:value', v);
  //   },
  // );
  const handleMouseEnter = () => {
    mouseHover.value = true;
  };

  const handleMouseLeave = () => {
    mouseHover.value = false;
  };

  const startEditing = () => {
    editing.value = true;
    oldValue.value = state.value;
    setTimeout(() => {
      // Focus on the input when editing starts
      const input = document.querySelector('.editable-tag .ant-input');
      input && input.focus();
    }, 0);
  };

  const saveEdit = () => {
    // Save the edited value
    editing.value = false;
    emit('update:value', v);
    // You can perform save operation here if needed
  };

  const cancelEdit = () => {
    editing.value = false;
    state.value = oldValue.value;
    // Reset input value to original
    // state.value = props.tagText;
  };
</script>

<style scoped>
  .editable-tag {
    display: flex;
    position: relative;
    padding-right: 30px; /* Space for edit icon */
  }

  .edit-icon {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    cursor: pointer;
  }
</style>
