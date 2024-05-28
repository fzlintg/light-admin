import { MODE } from '@c/CodeEditor';
//import { endsWith } from 'lodash-es';
import { setting as extentionSetting } from './loader';
import { formItemMap } from '../core/loader';
import { isBoolean } from 'lodash-es';

const t = {
  params: '参数',
  api: '获取数据',
  resultField: '结果字段',
  labelField: '标签字段',
  valueField: '值字段',
  defaultContext: '默认值',
  initFetchParams: '初始参数',
  apiParamKey: 'api参数名称',
  afterFetch: '获取数据后处理',
  _update: '回调刷新',
  allowClear: '允许清除',
  checkable: '多选',
  title: '标题',
  height: '高度',
  width: '宽度',
  zIndex: '显示层',
  buttonText: '按钮文本',
  bordered: '边框',
  chartVar: '初始变量',
  gridVar: '初始变量',
};
const setting = {};

for (const item in extentionSetting) {
  //自定义编辑器配置
  extentionSetting[item]?.forEach((item) => {
    item.defaultValue = item.defaultValue || formItemMap?.[item.component]?.defaultValue;
  });
}
for (const item in setting) {
  //如果componentProps带属性的自动生成编辑器配置
  setting[item].defaultValue =
    setting[item].defaultValue || formItemMap?.[setting[item].component]?.defaultValue;
}
//setting设置默认值
export { extentionSetting };

export function getSetting(item, options) {
  if (item?.endsWith('__func')) {
    const func = item.substr(0, item.length - 6);
    const params = options[`${func}__params`] || [];
    return {
      label: t[func] || func,
      component: 'CodeInput',
      componentProps: {
        mode: MODE.JS,
        buttonText: '编辑',
        editorTitle: '代码编辑',
        bordered: true,
        autoFormat: true,
        prefix: `function ${func}(${params}){`,
      },
      defaultValue: '',
    };
  } else if (isBoolean(options[item])) {
    return {
      field: item,
      label: item,
      category: 'control',
    };
  } else if (item?.endsWith('__tpl') || item?.endsWith('__var')) {
    const param = item.substr(0, item.indexOf('__'));
    return {
      label: `${t[param] || param}模版`,
      component: 'InputTextArea',
      componentProps: {
        autoSize: { minRows: 2 },
      },
    };
  } else if (typeof options[item] == 'string') {
    return {
      label: t[item],
      component: 'Input',
    };
  } else if (typeof options[item] == 'number') {
    return {
      label: t[item],
      component: 'InputNumber',
    };
  } else return undefined;
}

export default setting;
