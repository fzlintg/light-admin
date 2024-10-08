import 'uno.css';
import '@design/index.less';
import '@c/VxeTable/src/css/index.scss';
import '@design/tools.scss';

import 'ant-design-vue/dist/reset.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';

import { registerGlobComp } from '@c/registerGlobComp';
import { setupGlobDirectives } from '@directives';
import { setupI18n } from '@locales/setupI18n';
import { setupErrorHandle } from '@logics/error-handle';
import { initAppConfigStore } from '@logics/initAppConfig';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@router/guard';
import { setupStore } from '@/store';
// import { setupComponents } from './plugin';
import App from './App.vue';

//console.log('begin');

async function bootstrap() {
  const app = createApp(App);
  //app.use(Antd);
  // Configure store
  // 配置 store
  await setupI18n(app);
  setupStore(app);

  //console.log('i18n init ok');
  // Initialize internal system configuration
  // 初始化内部系统配置
  initAppConfigStore();

  // Register global components
  // 注册全局组件
  registerGlobComp(app);

  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取

  // Configure routing
  // 配置路由
  setupRouter(app);

  // router-guard
  // 路由守卫
  setupRouterGuard(router);

  // Register global directive
  // 注册全局指令
  setupGlobDirectives(app);

  // Configure global error handling
  // 配置全局错误处理
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();
  //setupComponents(app);
  app.mount('#app');
  app.config.devtools = true
  //app.config.globalProperties.$message = message;
}

bootstrap();
