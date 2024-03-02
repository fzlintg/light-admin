import { MODE } from '@c/CodeEditor';

export default {
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
  labelField:{
    label: '标签字段',
    component: 'Input',
  },
  valueField:{
    label: '值字段',
    component: 'Input',
  },
  allowClear: {
    category: 'control',
    label: '允许清除',
  },
  checkable:{
    category: 'control',
    label: '多选',
  },
  onChange__func:{
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
  height:{
    label: '高度',
    component: 'InputNumber',
  },
  buttonText:{
    label: '按钮文本',
    component: 'Input',
  },
};
