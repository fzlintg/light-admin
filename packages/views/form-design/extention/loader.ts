const settingModules = import.meta.glob('./**/setting.ts', { eager: true });
const schemaModules = import.meta.glob('./**/schema.ts', { eager: true });
const compModules = import.meta.glob('./**/comp.vue', { eager: true });
const setting = {},
  schema: Array<any> = [],
  comp = {};
for (const path in settingModules) {
  const name = path.split('/')[1];
  setting[name] = settingModules[path].default;
}
for (const path in schemaModules) {
  const component = path.split('/')[1];
  schema.push({ component, ...schemaModules[path].default });
}
for (const path in compModules) {
  const name = path.split('/')[1];
  comp[name] = compModules[path].default;
}

export { setting, schema, comp };
