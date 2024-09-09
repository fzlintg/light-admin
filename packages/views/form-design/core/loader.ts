import { deepMerge } from '@utils/index';
import { schemas } from '../extention/loader';
import { pick } from 'lodash-es';

const module = import.meta.glob('./itemConfig/*.ts', { eager: true });
let formItemConfig: any = {};
for (const path in module) {
  const itemClass = path.split('/')[2].split('.')[0];
  formItemConfig[itemClass] = pick(module[path], ['name', 'schema']);
}
formItemConfig = deepMerge(schemas, formItemConfig, 'concat');

const formItemMap = new Map();
for (const key in formItemConfig) {
  formItemConfig[key]?.schema?.forEach((item: any) => {
    formItemMap[item.component] = item;
  });
}

export { formItemConfig, formItemMap };
