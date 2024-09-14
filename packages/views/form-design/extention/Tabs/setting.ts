

export default [
  {
    component: 'CodeInput',
    field: 'onChange__func',
    label: '标签切换事件',
    componentProps: {
      buttonText: '编辑',
      editorTitle: '修改事件',
      bordered: true,
      autoFormat: true,
      mode: "javascript",
      prefix: 'function(key}{',
      suffix: '}',
    },
  },
];
