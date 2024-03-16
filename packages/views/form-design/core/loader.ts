const module = import.meta.glob('./itemConfig/*.ts', { eager: true });
const formItemConfig: any = {};
for (const path in module) {
  const itemClass = path.split('/')[2].split('.')[0];
  formItemConfig[itemClass] = module[path];
}
export { formItemConfig };
