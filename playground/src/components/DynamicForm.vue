<template>
  <form @submit.prevent="handleSubmit">
    <h2>{{ schema.title }}</h2>

    <div v-for="(field, name) in schema.fields" :key="name" class="form-group">
      <label v-if="!name.startsWith('_')">{{ field.label }}</label>
      <input
        v-if="!name.startsWith('_')"
        :type="field.type || 'text'"
        v-model="values[name]"
        :required="field.required"
      />
      <div v-if="errors[name]" class="error">{{ errors[name] }}</div>
    </div>

    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? '提交中...' : '提交' }}
    </button>

    <div v-if="submitResult" class="result">
      <div v-if="submitResult.error" class="error">{{ submitResult.error }}</div>
      <div v-else class="success">操作成功!</div>
    </div>
  </form>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { SchemaConverter } from '../../schema-converter';

  const props = defineProps({
    schema: {
      type: Object,
      required: true,
    },
  });

  const values = ref({});
  const errors = ref({});
  const isSubmitting = ref(false);
  const submitResult = ref(null);

  // 转换为运行态Schema
  const runtimeSchema = computed(() => {
    return SchemaConverter.convert(props.schema, { axios });
  });

  const handleSubmit = async () => {
    // 执行验证
    errors.value = runtimeSchema.value.validate(values.value);

    if (Object.keys(errors.value).length === 0) {
      isSubmitting.value = true;
      try {
        submitResult.value = await runtimeSchema.value.submit(values.value);
      } catch (error) {
        submitResult.value = { error: error.message };
      } finally {
        isSubmitting.value = false;
      }
    }
  };
</script>

<style scoped>
  .form-group {
    margin-bottom: 1rem;
  }

  .error {
    color: red;
    font-size: 0.8rem;
  }

  .success {
    color: green;
  }
</style>
