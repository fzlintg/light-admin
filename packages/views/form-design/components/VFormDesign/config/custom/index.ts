const modules = import.meta.glob('./*.ts', { eager: true });
const config = {};
for (const path in modules) {
  let name = path.split('/').pop();
  name = name.split('.')[0];
  config[name] = modules[path].default;
  // deepAssign(lang, modules[path].default)
}
export default config;
