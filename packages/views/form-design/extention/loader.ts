const settingModules = import.meta.glob('./**/setting.ts', { eager: true });
const schemaModules = import.meta.glob('./**/schema.ts', { eager: true });
const compModules = import.meta.glob('./**/comp.vue', { eager: true });
const funcModules = import.meta.glob('./**/func.ts', { eager: true });
const widgetModules = import.meta.glob('./**/widget.vue', { eager: true });
const setting = {},
  schema: Array<any> = [],
  comp = {},
  func = {},
  widget = {};
for (const path in settingModules) {
  const name = path.split('/')[1];
  setting[name] = settingModules[path].default;
}
for (const path in schemaModules) {
  const component = path.split('/')[1];
  schema.push({ component, ...schemaModules[path].default, _type: 'custom' });
}
for (const path in compModules) {
  const name = path.split('/')[1];
  comp[name] = compModules[path].default;
}
for (const path in funcModules) {
  const name = path.split('/')[1];
  func[name] = funcModules[path].default;
}
for (const path in widgetModules) {
  const name = path.split('/')[1];
  widget[name] = widgetModules[path].default;
}
export { setting, schema, comp, func, widget };
