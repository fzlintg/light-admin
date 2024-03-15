const modules = {
  setting: import.meta.glob('./**/setting.ts', { eager: true }),
  func: import.meta.glob('./**/func.ts', { eager: true }),
  comp: import.meta.glob('./**/comp.vue', { eager: true }),
  widget: import.meta.glob('./**/widget.vue', { eager: true }),
  item: import.meta.glob('./**/item.vue', { eager: true }),
};

const schemaModules = import.meta.glob('./**/schema.ts', { eager: true });
const expModule = {},
  schema = [];
for (const item in modules) {
  expModule[item] = {};
  for (const path in modules[item]) {
    const name = path.split('/')[1];
    expModule[item][name] = modules[item][path].default;
  }
}
for (const path in schemaModules) {
  const component = path.split('/')[1];
  schema.push({ component, ...schemaModules[path].default, _type: 'custom' });
}
const { setting, comp, func, widget, item } = expModule;
export { setting, schema, comp, func, widget, item };
