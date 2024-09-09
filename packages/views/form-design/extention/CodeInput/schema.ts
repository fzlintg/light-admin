import { MODE } from '@c/CodeEditor';

export default {
  label: '代码输入',
  type: 'input',
  icon: 'ant-design:credit-card-outlined',
  //icon: 'prime:file-edit',
  componentProps: {
    buttonText: '编辑',
    mode: MODE.JSON,
    editorTitle: '代码编辑',
    bordered: true,
    autoFormat: true,
    readonly: false,
    prefix: 'function(){',
    suffix: '}',
  },
  defaultValue: '',
};
