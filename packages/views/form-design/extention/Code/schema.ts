import { MODE } from '@c/CodeEditor';

export default {
  label: '代码',
  icon: 'ant-design:export-outlined',
  componentProps: {
    mode: MODE.JSON,
    bordered: true,
    autoFormat: true,
    readonly: false,
    height: 300,
    prefix: 'function(){',
    suffix: '}',
    defaultValue: '',
  },
};
