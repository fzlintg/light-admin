const modules = import.meta.glob('./**/**/options.ts', { eager: true });
const setttingModules = import.meta.glob('./**/**/setting.ts', { eager: true });
const chartOptions: any[] = [];
const chartMap = {};
const settingMap = {};
const schemaMap = {};
for (const path in modules) {
  const component = path.split('/')[2];
  chartOptions.push({ label: modules[path].name, value: component });
  chartMap[component] = modules[path].default;
  schemaMap[component] = modules[path].schema;
}
for (const path in setttingModules) {
  const component = path.split('/')[2];
  settingMap[component] = setttingModules[path].default;
}

export { chartOptions, chartMap, settingMap, schemaMap };
