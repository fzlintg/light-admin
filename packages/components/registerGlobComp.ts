import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout, Alert } from 'ant-design-vue';
import VXETable from 'vxe-table';
import LightForm from './LightForm/index.vue';
import Icon from '@c/Icon/Icon.vue';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout).use(Alert).use(VXETable);
  app.component('LightForm', LightForm);
  app.component('Icon', Icon);
}
