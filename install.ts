import 'uno.css';
import '@design/index.less';
import '@c/VxeTable/src/css/index.scss';
import '@design/tools.scss';

import 'ant-design-vue/dist/reset.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import VFormDesign from '@views/form-design/components/VFormDesign/index.vue';

const install = (app) => {};
VFormDesign.install = (app) => {};
//console.log('begin');
export default { install, VFormDesign };
