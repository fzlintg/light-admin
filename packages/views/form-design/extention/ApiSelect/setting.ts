import { MODE } from '@c/CodeEditor';
import { optionsListApi } from '@/api/demo/select';

export default [
  {
    name: 'labelField',
    label: '标签字段',
    component: 'Input',
  },
  {
    name: 'valueField',
    label: 'value字段',
    component: 'Input',
  },
  {
    name: 'resultField',
    label: 'result字段',
    component: 'Input',
  },
  {
    name: 'apiFunc',
    label: 'api',
    component: 'Code',
    componentProps: {
      mode: MODE.JS,
      buttonText: '编辑',
      editorTitle: '代码编辑',
      bordered: true,
      autoFormat: true,
    },
  },
];
