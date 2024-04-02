import { schemas } from '../extention/loader';

const module = import.meta.glob('./itemConfig/*.ts', { eager: true });
const formItemConfig: any = {};
for (const path in module) {
  const itemClass = path.split('/')[2].split('.')[0];
  formItemConfig[itemClass] = module[path];
}
Object.assign(formItemConfig, schemas);
const formItemMap = new Map();
for (const key in formItemConfig) {
  formItemConfig[key]?.schema?.forEach((item: any) => {
    formItemMap[item.component] = item;
  });
}

export { formItemConfig, formItemMap };
