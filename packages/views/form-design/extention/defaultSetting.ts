import { MODE } from '@c/CodeEditor';
import { endsWith } from 'lodash-es';

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
  buttonText: {
    label: '按钮文本',
    component: 'Input',
  },
};

export function getSetting(item, options) {
  if (endsWith(item, '__func')) {
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
