

export default [
  {
    component: 'CodeInput',
    label: 'onRowDelete函数',
    field: 'onRowDelete__func',

    componentProps: {
      mode: "javascript",
      buttonText: '编辑',
      editorTitle: '删除事件',
      bordered: true,
      autoFormat: true,
      prefix: 'function onRowDelete({idx,data,row}){',
      suffix: '}',
      defaultValue: '',
    },
  },
  {
    component: 'CodeInput',
    label: 'onRowInsert函数',
    field: 'onRowInsert__func',

    componentProps: {
      mode: "javascript",
      buttonText: '编辑',
      editorTitle: '新增事件',
      bordered: true,
      autoFormat: true,
      prefix: 'function onRowInsert({idx,data,row}){',
      suffix: '}',
      defaultValue: '',
    },
  },
  {
    component: 'CodeInput',
    label: 'onRowAdd函数',
    field: 'onRowAdd__func',

    componentProps: {
      mode: "javascript",
      buttonText: '编辑',
      editorTitle: '新增事件',
      bordered: true,
      autoFormat: true,
      prefix: 'function onRowAdd({idx,data,row}){',
      suffix: '}',
      defaultValue: '',
    },
  },
  {
    component: 'CodeInput',
    label: 'onRowChange函数',
    field: 'onRowChange__func',

    componentProps: {
      mode: "javascript",
      buttonText: '编辑',
      editorTitle: '修改事件',
      bordered: true,
      autoFormat: true,
      prefix: 'function onRowChange(data){',
      suffix: '}',
      defaultValue: '',
    },
  },
];
