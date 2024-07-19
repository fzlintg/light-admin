import { Component } from 'vue';
/**
 * @description：表单配置
 */

import { componentMap as VbenCmp, add } from '@c/Form/src/componentMap';
import { ComponentType } from '@c/Form/src/types';

import { componentMap as Cmp } from '../components';
import { item } from '../extention/loader';
// 左侧控件列表与初始化的控件属性
// props.slotName,会在formitem级别生成一个slot,并绑定当前record值
// 属性props，类型为对象，不能为undefined或是null。
//import { optionsListApi } from '@/api/demo/select';

//import { schema as extensionSchema } from '../extention/loader';
import { formItemConfig } from './loader';

// console.log(formItemConfig);
const componentMap = new Map<string, Component>();

//如果有其它控件，可以在这里初始化

//注册Ant控件库
Cmp.forEach((value, key) => {
  componentMap.set(key, value);
  if (VbenCmp[key] == null) {
    add(key as ComponentType, value);
  }
});
//注册vben控件库
VbenCmp.forEach((value, key) => {
  componentMap.set(key, value);
});
//自定义组件
for (const cmp in item) {
  componentMap.set(cmp, item[cmp]);
}

export { componentMap, formItemConfig };
