const modules = import.meta.glob('./**/**/options.ts', { eager: true });
const chartOptions: any[] = [];
const chartMap = {};
for (const path in modules) {
  const component = path.split('/')[1];
  chartOptions.push({ label: modules[path].name, value: component });
  chartMap[component] = modules[path].default;
}
export { chartOptions, chartMap };
