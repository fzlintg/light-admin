import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout, Alert } from 'ant-design-vue';

import VxeTable from 'vxe-table';
import 'vxe-table/lib/style.css';
// ...

// ...可选 UI
import VxeUI from 'vxe-pc-ui';
import 'vxe-pc-ui/lib/style.css';
import LightForm from './LightForm/index.vue';
import Icon from '@c/Icon/Icon.vue';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout).use(Alert).use(VxeUI).use(VxeTable);
  app.component('LightForm', LightForm);
  app.component('Icon', Icon);
}
