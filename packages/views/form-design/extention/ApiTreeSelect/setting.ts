import { MODE } from '@c/CodeEditor';
import { TreeSelect } from 'ant-design-vue';
export default [
  {
    name: 'api__func',
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
  {
    name: 'onChange__func',
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
  {
    category: 'control',
    name: 'treeCheckable',
    label: '多选',
  },
  {
    name:"showCheckedStrategy",
    component:"Select",
    label:"展示方式",
    componentProps:{
      options:[
        {value:TreeSelect.SHOW_ALL,label:"全显示"},
        {value:TreeSelect.SHOW_PARENT,label:"显父节点"},
        {value:TreeSelect.SHOW_CHILD,label:"显子节点"}
      ],hidden:false
    }
  }
];
