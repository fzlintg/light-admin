import { schema } from './../core/itemConfig/base';
// import { VueConstructor } from 'vue';
import { IVFormComponent, IFormConfig, IValidationRule } from '../typings/v-form-component';
import {
  cloneDeep,
  isArray,
  isFunction,
  isNumber,
  uniqueId,
  endsWith,
  isNil,
  isNull,
  forOwn,
  isObject,
} from 'lodash-es';
// import { del } from '@vue/composition-api';
// import { withInstall } from '@utils';

/**
 * 组件install方法
 * @param comp 需要挂载install方法的组件
 */
// export function withInstall<T extends { name: string }>(comp: T) {
//   return Object.assign(comp, {
//     install(Vue: VueConstructor) {
//       Vue.component(comp.name, comp);
//     },
//   });
// }

/**
 * 生成key
 * @param [formItem] 需要生成 key 的控件，可选，如果不传，默认返回一个唯一 key
 * @returns {string|boolean} 返回一个唯一 id 或者 false
 */
export function generateKey(formItem?: IVFormComponent): string | boolean {
  if (formItem && formItem.component) {
    const key = uniqueId(`${toLine(formItem.component)}_`);
    formItem.key = key;
    formItem.field = key;

    return true;
  }
  return uniqueId('key_');
}

/**
 * 移除数组中指定元素，value可以是一个数字下标，也可以是一个函数，删除函数第一个返回true的元素
 * @param array {Array<T>} 需要移除元素的数组
 * @param value {number | ((item: T, index: number, array: Array<T>) => boolean}
 * @returns {T} 返回删除的数组项
 */
export function remove<T>(
  array: Array<T>,
  value: number | ((item: T, index: number, array: Array<T>) => boolean),
): T | undefined {
  let removeVal: Array<T | undefined> = [];
  if (!isArray(array)) return undefined;
  if (isNumber(value)) {
    removeVal = array.splice(value, 1);
  } else {
    const index = array.findIndex(value);
    if (index !== -1) {
      removeVal = array.splice(index, 1);
    }
  }
  return removeVal.shift();
}

/**
 * 判断数据类型
 * @param value
 */
export function getType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}

/**
 * 生成唯一guid
 * @returns {String} 唯一id标识符
 */
export function randomUUID(): string {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4() + S4() + S4()}`;
}

/**
 * 驼峰转下划线
 * @param str
 */
export function toLine(str: string) {
  return str.replace(/([A-Z])/g, '$1').toLowerCase();
}

/**
 * 遍历表单项
 * @param array
 * @param cb
 */
export function formItemsForEach(array: IVFormComponent[], cb: (item: IVFormComponent) => void) {
  if (!isArray(array)) return;
  const traverse = (schemas: IVFormComponent[]) => {
    schemas.forEach((formItem: IVFormComponent) => {
      if (!formItem) return;
      if (['Grid'].includes(formItem.component)) {
        // 栅格布局，注意不要把GridSubForm加进来
        formItem.columns?.forEach((item) => traverse(item.children));
      } else {
        cb(formItem);
      }
    });
  };
  traverse(array);
}

/**
 * 查找表单项
 */
export const findFormItem: (
  schemas: IVFormComponent[],
  cb: (formItem: IVFormComponent) => boolean,
) => IVFormComponent | undefined = (schemas, cb) => {
  let res;
  const traverse = (schemas: IVFormComponent[]): boolean => {
    return schemas.some((formItem: IVFormComponent) => {
      const { component: type } = formItem;
      // 处理栅格
      if (['Grid'].includes(type)) {
        return formItem.columns?.some((item) => traverse(item.children));
      }
      if (cb(formItem)) res = formItem;
      return cb(formItem);
    });
  };
  traverse(schemas);
  return res;
};

//基于schema返回组件对象初始值
export const getInitValue = (schemas, formData: Object): any => {
  formItemsForEach(schemas, (item) => {
    const { component, field, defaultValue, defaultValueObj } = item;
    // const field = field || name;
    if (['Grid'].includes(component)) {
      // 栅格布局
      item.columns?.forEach((item) => {
        getInitValue(item.children, formData);
      });
    } else if (['GridSubForm'].includes(component)) {
      if (!formData[field!]) formData[field!] = [{}];
      item.columns?.forEach((item) => {
        getInitValue(item.children, formData[field!][0]);
      });
    } else if (['SubForm'].includes(component)) {
      if (!formData[field!]) formData[field!] = [{}];
      getInitValue(item.children, formData[field!][0]);
    } else {
      const fieldKeys = Object.keys(defaultValueObj || {});
      if (fieldKeys.length) {
        fieldKeys.map((field) => {
          if (formData[field] === undefined) {
            formData[field] = defaultValueObj![field];
          }
        });
      }
      if (!isNil(defaultValue)) {
        formData[field!] = defaultValue;
      }
    }
  });
  return formData;
};
/**
 * 打开json模态框时删除当前项属性
 * @param formConfig {IFormConfig}
 * @returns {IFormConfig}
 */
export const removeAttrs = (formConfig: IFormConfig): IFormConfig => {
  const copyFormConfig = cloneDeep(formConfig);
  delete copyFormConfig.currentItem;
  delete copyFormConfig.activeKey;
  copyFormConfig.schemas &&
    formItemsForEach(copyFormConfig.schemas, (item) => {
      delete item.icon;
      delete item.key;
    });
  return copyFormConfig;
};

/**
 * 处理异步选项属性，如 select treeSelect 等选项属性如果传递为函数并且返回Promise对象，获取异步返回的选项属性
 * @param {(() => Promise<any[]>) | any[]} options
 * @return {Promise<any[]>}
 */
export const handleAsyncOptions = async (
  options: (() => Promise<any[]>) | any[],
): Promise<any[]> => {
  try {
    if (isFunction(options)) return await options();
    return options;
  } catch {
    return [];
  }
};

/**
 * 格式化表单项校验规则配置
 * @param {IVFormComponent[]} schemas
 */
export const formatItem = (schemas) => {
  forOwn(schemas, (value: any, key) => {
    if (endsWith(key, '__func') && typeof value == 'string') {
      const func = key.substring(0, key.length - 6);
      const params = schemas[func + '__params'] || [];
      schemas![func] = new AsyncFunction(...params, schemas[key]);
    } else if (isObject(value)) {
      formatItem(value);
    }
  });
  return schemas;
};

export const formatItemByContext = (schemas, context) => {
  forOwn(schemas, (value: any, key) => {
    if (isFunction(value)) {
      schemas[key] = value.bind(context);
    } else if (isObject(value)) {
      schemas[key] = formatItemByContext(value, context);
    }
  });
  return schemas;
};
export const formatRules = (schemas: IVFormComponent[]) => {
  formItemsForEach(schemas, (item) => {
    //lintg  函数自动生成
    for (const name in item.componentProps) {
      if (endsWith(name, '__func')) {
        // if (item.componentProps[name].trim().length > 0) {
        const originName = name.substr(0, name.length - 6);
        const params = item.componentProps[originName + '__params'] || [];
        //item.componentProps[originName] = new AsyncFunction(...params, item.componentProps[name]);
        const func =
          item.componentProps[name].trim().length > 0
            ? new AsyncFunction(...params, item.componentProps[name])
            : () => true; //默认true
        item.componentProps[originName] = async function (...args) {
          //  debugger;
          let result = await func.call(this, ...args);
          if (isNull(result)) result = true;
          if (args?.[0]?.callback) {
            const { callback } = args?.[0]; //要求第一个参数带callback
            if (callback && isFunction(callback)) {
              callback(result);
            }
          }
        };
        // }
      }
    }

    if ('required' in item) {
      !isArray(item.rules) && (item.rules = []);
      item.rules.push({ required: true, message: item.message });
      delete item['required'];
      delete item['message'];
    }
  });
};

/**
 * 将校验规则中的正则字符串转换为正则对象
 * @param {IValidationRule[]} rules
 * @return {IValidationRule[]}
 */
export const strToReg = (rules: IValidationRule[]) => {
  const newRules = cloneDeep(rules);
  return newRules.map((item) => {
    if (item.pattern) item.pattern = runCode(item.pattern);
    return item;
  });
};

/**
 * 执行一段字符串代码，并返回执行结果，如果执行出错，则返回该参数
 * @param code
 * @return {any}
 */
export const runCode = <T>(code: any): T => {
  try {
    return new Function(`return ${code}`)();
  } catch {
    return code;
  }
};

export const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
