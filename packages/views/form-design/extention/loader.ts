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

const settingExclude = {};
const settingLogics = {};
const settingHide = {};

const schemaModules = import.meta.glob('./**/schema.ts', { eager: true });
const expModule = {},
  schemas = {
    showItem_action: { name: '操作类', schema: [] },
    input: { name: '输入类', schema: [] },
    select: { name: '选择类', schema: [] },
    showItem: { name: '展示类', schema: [] },
    containerItem: { name: '容器组件', schema: [] },
    upload: { name: '上传', schema: [] },
    container: { name: '展示容器', schema: [] },
    gridContainer: { name: '布局容器', schema: [] },
    mixItem: { name: '融合组件', schema: [] },
    base: { name: '基础组件', schema: [] },
  };

for (const item in modules) {
  expModule[item] = {};
  for (const path in modules[item]) {
    const name = path.split('/')[1];
    expModule[item][name] = modules[item][path].default || [];
    if (item == 'setting') {
      settingExclude[name] = modules[item][path].exclude || [];
      settingLogics[name] = modules[item][path]?.logics || [];
      settingHide[name] = modules[item][path]?.hide;
    }
  }
}

for (const path in schemaModules) {
  const component = path.split('/')[1];
  // console.log(schemaModules[path]?.default?.type);
  schemas[schemaModules[path]?.default?.type || 'base'].schema.push({
    component,
    type: 'base',
    ...schemaModules[path].default,
  });
}
const { setting, comp, func, widget, item, settingComp } = expModule;

export {
  setting,
  schemas,
  comp,
  func,
  widget,
  item,
  settingComp,
  settingExclude,
  settingLogics,
  settingHide,
};
