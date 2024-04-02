import { IAnyObject } from '../../../typings/base-type';
//import { baseComponents, customComponents } from '../../../core/formItemConfig';
import { formItemConfig } from '../../../core/formItemConfig';
import { Input, Select, RadioGroup, Slider, InputNumber } from 'ant-design-vue';
import { Component } from 'vue';

export const globalConfigState: { span: number } = {
  span: 24,
};
export interface IBaseFormAttrs {
  // name: string; // 字段名
  label: string; // 字段标签
  component?: string | Component; // 属性控件
  componentProps?: IAnyObject; // 传递给控件的属性
  exclude?: string[]; // 需要排除的控件
  includes?: string[]; // 符合条件的组件
  on?: IAnyObject;
  children?: IBaseFormAttrs[];
  category?: 'control' | 'input';
  hidden?: boolean; //lintg
  sortTitle?: string; //lintg 分类
  width?: string;
  field: string; //lintg
  defaultValue?: any;
}

export interface IBaseFormItemControlAttrs extends IBaseFormAttrs {
  target?: 'props' | 'options'; // 绑定到对象下的某个目标key中
}

export const baseItemColumnProps: IBaseFormAttrs[] = [
  {
    field: 'span',
    label: '栅格数',
    component: 'Slider',
    on: {
      change(value: number) {
        globalConfigState.span = value;
      },
    },
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },

  {
    field: 'offset',
    label: '栅格左侧的间隔格数',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: 'order',
    label: '栅格顺序,flex 布局模式下有效',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: 'pull',
    label: '栅格向左移动格数',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: 'push',
    label: '栅格向右移动格数',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: 'xs',
    label: '<576px 响应式栅格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: 'sm',
    label: '≥576px 响应式栅格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: 'md',
    label: '≥768p 响应式栅格',
    component: 'Slider',

    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: 'lg',
    label: '≥992px 响应式栅格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: 'xl',
    label: '≥1200px 响应式栅格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: 'xxl',
    label: '≥1600px 响应式栅格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
  {
    field: '≥2000px',
    label: '≥1600px 响应式栅格',
    component: 'Slider',
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
  },
];

// 控件属性面板的配置项
export const advanceFormItemColProps: IBaseFormAttrs[] = [
  {
    field: 'labelCol',
    label: '标签col',
    component: Slider,
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
    exclude: ['Grid'],
  },
  {
    field: 'wrapperCol',
    label: '控件-span',
    component: Slider,
    componentProps: {
      max: 24,
      min: 0,
      marks: { 12: '' },
    },
    exclude: ['Grid'],
  },
];
// 控件属性面板的配置项
//baseComponents, customComponents
const schemaAll = [];

for (const item in formItemConfig) {
  schemaAll.push(...formItemConfig[item].schema);
}

export const baseFormItemProps: IBaseFormAttrs[] = [
  {
    // 动态的切换控件的类型
    field: 'component',
    label: '控件-FormItem',
    component: Select,
    componentProps: {
      options: schemaAll.map((item) => ({ value: item.component, label: item.label })),
    },
  },
  {
    field: 'width',
    label: '组件列宽(单行表单)',
    component: Input,
    componentProps: {
      placeholder: '单行表单内有效',
    },
  },
  {
    field: 'label',
    label: '标签',
    component: Input,
    componentProps: {
      type: 'Input',
      placeholder: '请输入标签',
    },
    exclude: ['Grid'],
  },
  {
    field: 'field',
    label: '字段标识',
    component: Input,
    componentProps: {
      type: 'InputTextArea',
      placeholder: '请输入字段标识',
    },
    exclude: ['Grid'],
  },
  {
    field: 'helpMessage',
    label: 'helpMessage',
    component: Input,
    componentProps: {
      placeholder: '请输入提示信息',
    },
    exclude: ['Grid'],
  },
];

// 控件属性面板的配置项
export const advanceFormItemProps: IBaseFormAttrs[] = [
  {
    field: 'labelAlign',
    label: '标签对齐',
    component: RadioGroup,
    componentProps: {
      options: [
        {
          label: '靠左',
          value: 'left',
        },
        {
          label: '靠右',
          value: 'right',
        },
      ],
    },
    exclude: ['Grid'],
  },

  {
    field: 'help',
    label: 'help',
    component: Input,
    componentProps: {
      placeholder: '请输入提示信息',
    },
    exclude: ['Grid'],
  },
  {
    field: 'extra',
    label: '额外消息',
    component: Input,
    componentProps: {
      type: 'InputTextArea',
      placeholder: '请输入额外消息',
    },
    exclude: ['Grid'],
  },
  {
    field: 'validateTrigger',
    label: 'validateTrigger',
    component: Input,
    componentProps: {
      type: 'InputTextArea',
      placeholder: '请输入validateTrigger',
    },
    exclude: ['Grid'],
  },
  {
    field: 'validateStatus',
    label: '校验状态',
    component: RadioGroup,
    componentProps: {
      options: [
        {
          label: '默认',
          value: '',
        },
        {
          label: '成功',
          value: 'success',
        },
        {
          label: '警告',
          value: 'warning',
        },
        {
          label: '错误',
          value: 'error',
        },
        {
          label: '校验中',
          value: 'validating',
        },
      ],
    },
    exclude: ['Grid'],
  },
];

export const baseFormItemControlAttrs: IBaseFormItemControlAttrs[] = [
  {
    field: 'required',
    label: '必填项',
    component: 'Checkbox',
    exclude: ['alert'],
  },
  {
    field: 'hidden',
    label: '隐藏',
    component: 'Checkbox',
    exclude: ['alert'],
  },
  {
    field: 'hiddenLabel',
    component: 'Checkbox',
    exclude: ['Grid'],
    label: '隐藏标签',
  },
  {
    field: 'colon',
    label: 'label后面显示冒号',
    component: 'Checkbox',
    componentProps: {},
    exclude: ['Grid'],
  },
  {
    field: 'hasFeedback',
    label: '输入反馈',
    component: 'Checkbox',
    componentProps: {},
    includes: ['Input'],
  },
  {
    field: 'autoLink',
    label: '自动关联',
    component: 'Checkbox',
    componentProps: {},
    includes: ['Input'],
  },
  {
    field: 'validateFirst',
    label: '检验证错误停止',
    component: 'Checkbox',
    componentProps: {},
    includes: ['Input'],
  },
];
