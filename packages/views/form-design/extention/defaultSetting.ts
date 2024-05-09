import { MODE } from '@c/CodeEditor';
//import { endsWith } from 'lodash-es';
import { setting as extentionSetting } from './loader';
import { formItemMap } from '../core/loader';

const setting = {
  api__func: {
    label: '获取数据api',
    component: 'CodeInput',
    componentProps: {
      mode: MODE.JS,
      buttonText: '编辑',
      editorTitle: '代码编辑',
      bordered: true,
      autoFormat: true,
      prefix: 'function api(){',
    },
  },
  title: {
    label: '标题',
    component: 'Input',
  },
  resultField: {
    label: '结果字段',
    component: 'Input',
  },
  labelField: {
    label: '标签字段',
    component: 'Input',
  },
  valueField: {
    label: '值字段',
    component: 'Input',
  },
  allowClear: {
    category: 'control',
    label: '允许清除',
  },
  checkable: {
    category: 'control',
    label: '多选',
  },
  onChange__func: {
    label: 'onChange',
    component: 'CodeInput',
    componentProps: {
      mode: MODE.JS,
      buttonText: '编辑',
      editorTitle: '代码编辑',
      bordered: true,
      autoFormat: true,
      prefix: 'function onChange(e,v){',
    },
  },
  height: {
    label: '高度',
    component: 'InputNumber',
  },
  width: {
    label: '宽度',
    component: 'InputNumber',
  },
  zIndex: {
    label: '显示层',
    component: 'InputNumber',
  },
  buttonText: {
    label: '按钮文本',
    component: 'Input',
  },
  bordered: {
    category: 'control',
    label: '边框',
  },
};

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
      label: func,
      component: 'CodeInput',
      componentProps: {
        mode: MODE.JS,
        buttonText: '编辑',
        editorTitle: '代码编辑',
        bordered: true,
        autoFormat: true,
        prefix: `function ${func}(${params}){`,
      },
    };
  }
  return undefined;
}

export default setting;
