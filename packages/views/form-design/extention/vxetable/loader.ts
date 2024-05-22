const modules = import.meta.glob('./tpl/*.ts', { eager: true });
const tplOptions: any[] = [];
const optionsMap = {};
const schemaMap = {};
const actionsMap = {};
for (const path in modules) {
  const component = path.split('/')[2].split('.')[0];
  tplOptions.push({ label: modules[path].name, value: component });
  optionsMap[component] = modules[path].default;
  schemaMap[component] = modules[path].schema;
  actionsMap[component] = modules[path].actions;
}
export { tplOptions, optionsMap, schemaMap, actionsMap };
