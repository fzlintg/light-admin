import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';

// 全局配置axios
import axios from 'axios';

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.mount('#app');
