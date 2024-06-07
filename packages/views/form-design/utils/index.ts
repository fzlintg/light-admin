import { name } from './../extention/Echarts/tpl/pie/pieBar/options';
import { forEach } from '@utils/helper/treeHelper';
import { schema } from './../core/itemConfig/base';
import { nextTick, emit } from 'vue';
import { IVFormComponent, IFormConfig, IValidationRule } from '../typings/v-form-component';
import {
  cloneDeep,
  isArray,
  isFunction,
  isNumber,
  // uniqueId,
  endsWith,
  isNil,
  isNull,
  forOwn,
  isObject,
  set,
  isString,
  template,
} from 'lodash-es';
import * as _ from 'lodash-es';
import { uniqueId, setUniqueId } from './uniqueId';
// import { del } from '@vue/composition-api';
// import { withInstall } from '@utils';
import { defHttp } from '@utils/http/axios';
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
export function generateKey(formItem?: IVFormComponent, flag = true): string | boolean {
  if (formItem && formItem.component) {
    const key = flag ? uniqueId(`${toLine(formItem.component)}_`) : formItem.field;
    if (!flag) {
      const id = formItem.field?.split('_')?.[1];
      if (id) setUniqueId(`${toLine(formItem.component)}_`, id);
    }

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

export function findSiblingsByName(schemas: IVFormComponent[], targetName) {
  let formItems: any = findFormItem(schemas, (item: IVFormComponent) => {
    if (['Modal', 'Drawer'].includes(item.component)) {
      if (findFormItem(item.children, (i) => i.field == targetName)) return true;
    }
  });
  formItems = formItems ? formItems.children : schemas;
  const result: any[] = [];
  formItemsForEach(formItems, (item) => {
    if (['Modal', 'Drawer'].includes(item.component)) return false;
    if (item.field != targetName)
      result.push({ label: item.label + '/' + item.field, value: item.field });
  });
  return result;
}
/**
 * 遍历表单项
 * @param array
 * @param cb
 */
export function formItemsForEach(array: IVFormComponent[], cb: (item: IVFormComponent) => boolean) {
  if (!isArray(array)) return;
  const traverse = (schemas: IVFormComponent[], parent?: IVFormComponent) => {
    schemas.forEach((formItem: IVFormComponent) => {
      if (!formItem || cb(formItem) == false) return; //不往下遍历
      if (formItem.type == 'gridContainer') {
        // 栅格布局，注意不要把GridSubForm加进来
        formItem.columns?.forEach((item) => traverse(item.children, formItem));
      } else if (['container', 'containerItem'].includes(formItem.type)) {
        traverse(formItem.children);
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
      if (cb(formItem)) {
        res = formItem;
        return true;
      }
      // 处理栅格
      if (type == 'gridContainer') {
        return formItem.columns?.some((item) => traverse(item.children));
      } else if (['container', 'containerItem'].includes(type)) {
        return traverse(formItem.children);
      }
      return false;
    });
  };
  traverse(schemas);
  return res;
};
export const getChildFieldList = (schemas, field) => {
  const itemList = getChildItemList(schemas, field);
  return itemList.map((item) => item.field);
};
export const getChildItemList = (schemas, field) => {
  const formItem = findFormItem(schemas, (item) => item.field === field);
  const itemList: any[] = [];
  if (['containerItem', 'gridContainer', 'container'].includes(formItem.type)) {
    formItemsForEach([formItem], (item) => {
      itemList.push(item);
    });
  } else itemList.push(formItem);
  return itemList;
};

//基于schema返回组件对象初始值
export const getInitValue = (schemas, formModel: Object): any => {
  formItemsForEach(schemas, (item) => {
    const { component, field, defaultValueObj } = item;
    const defaultValue = item.defaultValue || item?.componentProps.defaultValue;
    // const field = field || name;
    if (item.type == 'gridContainer') {
      // 栅格布局
      item.columns?.forEach((i) => {
        getInitValue(i.children, formModel);
      });
    } else if (['SubForm', 'GridSubForm'].includes(component)) {
      if (!formModel[field!]) formModel[field!] = [{}];
      getInitValue(item.children, formModel[field!][0]);
    } else {
      const fieldKeys = Object.keys(defaultValueObj || {});
      if (fieldKeys.length) {
        fieldKeys.map((field) => {
          if (formModel[field] === undefined) {
            formModel[field] = defaultValueObj![field];
          }
        });
      }
      if (!isNil(defaultValue)) {
        formModel[field!] = defaultValue;
      }
    }
  });
  return formModel;
};
export const formModelToData = (formModel) => {
  const formData = {};
  for (const item in formModel) {
    set(formData, item, isArray(formModel[item]) ? ArrayToData(formModel[item]) : formModel[item]);
  }
  return formData;
};
export const ArrayToData = (json: Array<any>) => {
  return json.map((item) => {
    return isObject(item) ? formModelToData(item) : item;
  });
};

export const flattenArray = (json: Array<any>) => {
  const result: Array<any> = [];
  json.forEach((item) => {
    if (isObject(item)) result.push(flattenObject(item));
    else result.push(item); //lintg
  });
  return result;
};
export const flattenObject = (json) => {
  const result = {};
  function flatten(obj, path = '') {
    for (const key in obj) {
      const value = obj[key];
      const newPath = path ? path + '.' + key : key;
      if (value !== null && isArray(value)) result[newPath] = flattenArray(value);
      else if (value !== null && isObject(value)) flatten(value, newPath);
      else {
        result[newPath] = value;
      }
    }
  }
  flatten(json);
  return result;
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

export const TransJSonToTs = (schemas) => {
  formatItemFunc(schemas);
  function replaceQuotes(match, group) {
    const replacedStr = group
      .replace(/\\"/g, '"')
      .replace(/\\n/g, ' \n ')
      .replace(/`/g, ' \\` ')
      .replace(/\${/g, '$\\{'); // 替换含有\"为“
    return '`' + replacedStr + '`';
  }
  return JSON.stringify(schemas, null, '\t').replace(/"\$_begin(.*?)\$_end"/g, replaceQuotes);
};
export const formatItem = (schemas) => {
  //生成特殊字符对象
  forOwn(schemas, (value: any, key) => {
    if (isArray(schemas) && isString(value)) return;
    if (endsWith(key, '__func') && typeof value == 'string') {
      const func = key.substring(0, key.length - 6);
      const params = schemas[func + '__params'] || [];
      schemas![func] = `$func_b:${params.join(',')}: ` + schemas[key] + ' $func_e';
      delete schemas[key];
      delete schemas[func + '__params'];
    } else if (endsWith(key, '__var') && typeof value == 'string') {
      const v = key.substring(0, key.length - 5);
      schemas![v] = `$var_b:` + schemas[key] + ':$var_e';
      delete schemas[key];
    } else if (isObject(value)) {
      formatItem(value);
    }
  });
  return schemas;
};

export const TransObjectToCode = (schemas) => {
  formatItem(schemas);
  const regex = /\"\$func_b:(.*?)\:(.*?)\$func_e\"/g;
  const regex2 = /\"\$var_b:(.*?)\:\$var_e\"/g;
  return JSON.stringify(schemas)
    .replace(regex, function (match, params, code) {
      const cleanedCode = code.replace(/\\"/g, '"').replace(/\\n/g, '  ');
      return cleanedCode.indexOf('await ') > -1
        ? `async (${params}) => {${cleanedCode}}`
        : `((${params}) => {${cleanedCode}})`;
    })
    .replace(regex2, function (match, code) {
      return code.replace(/\\"/g, '"').replace(/\\n/g, '  ');
    });
};

export const formatItemFunc = (schemas) => {
  //针对函数变量用模版字符串
  forOwn(schemas, (value: any, key) => {
    if ((endsWith(key, '__func') || endsWith(key, '__var')) && typeof value == 'string') {
      schemas![key] = '$_begin ' + schemas[key] + ' $_end';
    } else if (isObject(value)) {
      formatItemFunc(value);
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
export function formatFunc(item, flag = false) {
  for (const name in item) {
    if (endsWith(name, '__func')) {
      // if (item.componentProps[name].trim().length > 0) {
      const originName = name.substr(0, name.length - 6);
      const params = item[originName + '__params'] || [];
      //item.componentProps[originName] = new AsyncFunction(...params, item.componentProps[name]);
      const funcAsync = item[name]?.indexOf('await ') > -1 ? true : false;
      const func =
        item[name]?.trim()?.length > 0
          ? funcAsync
            ? new AsyncFunction('{axios,nextTick,_}', ...params, item[name])
            : new Function('{_}', ...params, item[name])
          : () => true; //默认true

      if (funcAsync) {
        item[originName] = async function (...args) {
          // console.log('exec', this);
          // const argsCall = args.length == 0 ? [{}] : args;
          let result = await func.call(this, { axios: defHttp, nextTick, _ }, ...args);
          if (args?.[0]?.callback) {
            //回调模式
            if (isNull(result)) result = true;
            const { callback } = args?.[0]; //要求第一个参数带callback
            if (callback && isFunction(callback)) {
              callback(result);
            }
          } else return result; //直接返回
        };
      } else {
        item[originName] = function (...args) {
          let result = func.call(this, { _ }, ...args);
          if (args?.[0]?.callback) {
            //回调模式
            if (isNull(result)) result = true;
            const { callback } = args?.[0]; //要求第一个参数带callback
            if (callback && isFunction(callback)) {
              callback(result);
            }
          } else return result; //直接返回
        };
      }

      if (flag) {
        delete item[originName + '__params'];
        delete item[name];
      }
      // }
    } else if (endsWith(name, '__var')) {
      const originName = name.substr(0, name.length - 5);
      item[originName] = eval('(' + item[name] + ')');
      //   if (flag) delete item[name];
    } else if (endsWith(name, '__tpl')) {
      const originName = name.substr(0, name.length - 5);
      const context =
        item['defaultContext'] ??
        (item['defaultContext__tpl'] ? eval('(' + item['defaultContext__tpl'] + ')') : {});
      const paramStr = template(item[name])(context);
      item[originName] = eval('(' + paramStr + ')');
    }
  }
}
// export const formatObject = (obj, flag = false) => {
//   if (isObject(obj)) {
//     for (const item in obj) {
//     }
//   }
// };
export const formatRules = (schemas: IVFormComponent[], flag = false) => {
  formItemsForEach(schemas, (item) => {
    //lintg  函数自动生成
    formatFunc(item.componentProps, flag);
    if (item.component == 'Dropdown') {
      //下拉对象菜单
      for (const childItem of item.children) {
        formatFunc(childItem, flag);
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
export const getFieldList = (schemas, field) => {
  const result = [];
  formItemsForEach(schemas, (item) => {
    if (item.field == field) {
      result.push(item);
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
function getQuery(href, name) {
  const reg = new RegExp('([&|?])' + name + '=([^&]*)');
  const result = href.match(reg);
  return result ? result[2] : void 0;
}
export function getQueryParam(variable) {
  return getQuery(window.location.href, variable);
}
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
export const isAsyncFunction = (v) =>
  Object.prototype.toString.call(v) === '[object AsyncFunction]';
