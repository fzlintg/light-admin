import type { App } from 'vue';
import { createPinia } from 'pinia';
import { registerPiniaPersistPlugin } from '@store/plugin/persist';
import app from '../App.vue';

const store = createPinia();
registerPiniaPersistPlugin(store);
createApp(app).use(store);

export function setupStore(app: App<Element>) {
  //app.use(store);
}

export { store };
