import { MODE } from '@c/CodeEditor';

export default {
  label: '代码',
  componentProps: {
    buttonText: '编辑',
    mode: MODE.JSON,
    editorTitle: '代码编辑',
    bordered: true,
    autoFormat: true,
    readonly: false,
  },
};
