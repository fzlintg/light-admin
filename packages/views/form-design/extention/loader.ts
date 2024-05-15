//import { forEach } from '@utils/helper/treeHelper';
// import { formItemMap } from '../core/loader';

const modules = {
  setting: import.meta.glob(['./**/setting.ts', '!./Echarts/tpl/**/setting.ts'], { eager: true }),
  settingComp: import.meta.glob(['./**/setting.vue'], { eager: true }),
  func: import.meta.glob('./**/func.ts', { eager: true }),
  comp: import.meta.glob('./**/comp.vue', { eager: true }),
  widget: import.meta.glob('./**/widget.vue', { eager: true }),
  item: import.meta.glob('./**/item.vue', { eager: true }),
};

const schemaModules = import.meta.glob('./**/schema.ts', { eager: true });
const expModule = {},
  schemas = {
    showItem: { name: '展示类', schema: [] },
    containerItem: { name: '容器组件', schema: [] },
    custom: { name: '自定义组件', schema: [] },
    container: { name: '纯容器', schema: [] },
    gridContainer: { name: '布局容器', schema: [] },
  };

for (const item in modules) {
  expModule[item] = {};
  for (const path in modules[item]) {
    const name = path.split('/')[1];
    expModule[item][name] = modules[item][path].default;
  }
}
for (const path in schemaModules) {
  const component = path.split('/')[1];
  // console.log(schemaModules[path]?.default?.type);
  schemas[schemaModules[path]?.default?.type || 'custom'].schema.push({
    component,
    ...schemaModules[path].default,
    _type: 'custom',
  });
}
const { setting, comp, func, widget, item, settingComp } = expModule;

export { setting, schemas, comp, func, widget, item, settingComp };
