const modules = import.meta.glob('./*.vue', { eager: true });
const comp = {};
for (const path in modules) {
  let name = path.split('/').pop();
  name = name.split('.')[0];
  comp[name] = modules[path].default;
}
export default comp;
