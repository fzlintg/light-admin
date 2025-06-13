<template>
  <div class="app-container">
    <h1>Schema转换系统 - Vue 3示例</h1>
    <div class="form-demo">
      <DynamicForm :schema="userFormSchema" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import DynamicForm from './components/DynamicForm.vue';
  import { userFormSchema } from './schemas/user-form';
</script>

<style>
  .app-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
  }

  h1 {
    color: #333;
    text-align: center;
  }

  .form-demo {
    margin-top: 2rem;
    padding: 1.5rem;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #f9f9f9;
  }

  input {
    width: 100%;
    margin-top: 0.3rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #42b983;
    color: white;
    cursor: pointer;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
</style>
