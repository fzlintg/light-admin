import { IBaseFormAttrs } from './formItemPropsConfig';
import { MODE } from '@c/CodeEditor';

interface IBaseComponentProps {
  [key: string]: IBaseFormAttrs[];
}

type BaseFormAttrs = Omit<IBaseFormAttrs, 'tag'>;

export const baseComponentControlAttrs: Omit<IBaseFormAttrs, 'tag'>[] = [
  {
    field: 'hideSub',
    label: '隐藏(子表单)',
  },
  {
    // 没有disabled属性的控件不能作为form控件
    field: 'disabled',
    label: '禁用',
  },
  {
    // 没有disabled属性的控件不能作为form控件
    field: 'autofocus',
    label: '自动获取焦点',
    includes: [
      'Input',
      'Select',
      'InputTextArea',
      'InputNumber',
      'DatePicker',
      'RangePicker',
      'MonthPicker',
      'TimePicker',
      'Cascader',
      'TreeSelect',
      'Switch',
      'AutoComplete',
      'Slider',
    ],
  },
  {
    field: 'allowClear',
    label: '可清除',
    includes: [
      'Input',
      'Select',
      'InputTextArea',
      'InputNumber',
      'DatePicker',
      'RangePicker',
      'MonthPicker',
      'TimePicker',
      'Cascader',
      'TreeSelect',
      'AutoComplete',
    ],
  },
  { field: 'fullscreen', label: '全屏', includes: ['Calendar'] },
  {
    field: 'showSearch',
    label: '可搜索',
    includes: ['Select', 'TreeSelect', 'Cascader', 'Transfer'],
  },
  {
    field: 'showTime',
    label: '显示时间',
    includes: ['DatePicker', 'RangePicker', 'MonthPicker'],
  },
  {
    field: 'range',
    label: '双向滑动',
    includes: [],
  },
  {
    field: 'allowHalf',
    label: '允许半选',
    includes: ['Rate'],
  },
  {
    field: 'multiple',
    label: '多选',
    includes: ['Select', 'TreeSelect', 'Upload'],
  },
  {
    field: 'directory',
    label: '文件夹',
    includes: ['Upload'],
  },
  {
    field: 'withCredentials',
    label: '携带cookie',
    includes: ['Upload'],
  },
  {
    field: 'bordered',
    label: '是否有边框',
    includes: ['Select', 'Input'],
  },
  {
    field: 'defaultActiveFirstOption',
    label: '高亮第一个选项',
    component: 'Checkbox',
    includes: ['Select', 'AutoComplete'],
  },
  {
    field: 'dropdownMatchSelectWidth',
    label: '下拉菜单和选择器同宽',
    component: 'Checkbox',
    includes: ['Select', 'TreeSelect', 'AutoComplete'],
  },
];

//共用属性
export const baseComponentCommonAttrs: Omit<IBaseFormAttrs, 'tag'>[] = [
  {
    field: '_update__func',
    label: '回调刷新',
    component: 'CodeInput',
    componentProps: {
      mode: MODE.JS,
      buttonText: '编辑',
      editorTitle: '代码编辑',
      bordered: true,
      autoFormat: true,
      prefix: 'function update(){',
      suffix: '}',
    },
  },
  {
    field: 'size',
    label: '尺寸',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '默认',
          value: 'default',
        },
        {
          label: '大',
          value: 'large',
        },
        {
          label: '小',
          value: 'small',
        },
      ],
    },
    includes: ['InputNumber', 'Input', 'Cascader', 'Button'],
  },
  {
    field: 'placeholder',
    label: '占位符',
    component: 'Input',
    componentProps: {
      placeholder: '请输入占位符',
    },
    includes: [
      'AutoComplete',
      'InputTextArea',
      'InputNumber',
      'Input',
      'InputTextArea',
      'Select',
      'DatePicker',
      'MonthPicker',
      'TimePicker',
      'TreeSelect',
      'Cascader',
      'ApiTreeSelect',
    ],
  },
  {
    field: 'style',
    label: '样式',
    component: 'Input',
    componentProps: {
      placeholder: '请输入样式',
    },
  },
  {
    field: 'open',
    label: '一直展开下拉菜单',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '默认',
          value: undefined,
        },
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    includes: ['Select', 'AutoComplete'],
  },
  //add by lintg
];

const componentAttrs: IBaseComponentProps = {
  AutoComplete: [
    {
      field: 'backfill',
      label: '自动回填',
      component: 'Switch',
      componentProps: {
        span: 8,
      },
    },
    {
      field: 'defaultOpen',
      label: '是否默认展开下拉菜单',
      component: 'Checkbox',
    },
  ],
  IconPicker: [
    {
      field: 'mode',
      label: '模式',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'ICONIFY', value: null },
          { label: 'SVG', value: 'svg' },
          // { label: '组合', value: 'combobox' },
        ],
      },
    },
  ],

  // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types
  Input: [
    {
      field: 'type',
      label: '类型',
      component: 'Select',
      componentProps: {
        options: [
          { value: 'text', label: '文本' },
          { value: 'search', label: '搜索' },
          { value: 'number', label: '数字' },
          { value: 'range', label: '数字范围' },
          { value: 'password', label: '密码' },
          { value: 'date', label: '日期' },
          { value: 'datetime-local', label: '日期-无时区' },
          { value: 'time', label: '时间' },
          { value: 'month', label: '年月' },
          { value: 'week', label: '星期' },
          { value: 'email', label: '邮箱' },
          { value: 'url', label: 'URL' },
          { value: 'tel', label: '电话号码' },
          { value: 'file', label: '文件' },
          { value: 'button', label: '按钮' },
          { value: 'submit', label: '提交按钮' },
          { value: 'reset', label: '重置按钮' },
          { value: 'radio', label: '单选按钮' },
          { value: 'checkbox', label: '复选框' },
          { value: 'color', label: '颜色' },
          { value: 'image', label: '图像' },
          { value: 'hidden', label: '隐藏' },
        ],
      },
    },
    // {
    //   field: 'defaultValue',
    //   label: '默认值',
    //   component: 'Input',
    //   componentProps: {
    //     type: 'text',
    //     placeholder: '请输入默认值',
    //   },
    // },
    {
      field: 'prefix',
      label: '前缀',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '请输入前缀',
      },
    },
    {
      field: 'suffix',
      label: '后缀',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '请输入后缀',
      },
    },
    {
      field: 'addonBefore',
      label: '前置标签',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '请输入前置标签',
      },
    },
    {
      field: 'addonAfter',
      label: '后置标签',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '请输入后置标签',
      },
    },
    {
      field: 'maxLength',
      label: '最大长度',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '请输入最大长度',
      },
      defaultValue: 100,
    },
  ],

  InputNumber: [
    {
      field: 'defaultValue',
      label: '默认值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入默认值',
      },
    },
    {
      field: 'min',
      label: '最小值',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '请输入最小值',
      },
    },
    {
      field: 'max',
      label: '最大值',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '请输入最大值',
      },
    },
    {
      field: 'precision',
      label: '数值精度',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '请输入最大值',
      },
    },
    {
      field: 'step',
      label: '步长',
      component: 'InputNumber',
      componentProps: {
        type: 'text',
        placeholder: '请输入步长',
      },
    },
    {
      field: 'decimalSeparator',
      label: '小数点',
      component: 'Input',
      componentProps: { type: 'text', placeholder: '请输入小数点' },
    },
    {
      field: 'addonBefore',
      label: '前置标签',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '请输入前置标签',
      },
    },
    {
      field: 'addonAfter',
      label: '后置标签',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '请输入后置标签',
      },
    },
    {
      field: 'controls',
      label: '是否显示增减按钮',
      component: 'Checkbox',
    },
    {
      field: 'keyboard',
      label: '是否启用键盘快捷行为',
      component: 'Checkbox',
    },
    {
      field: 'stringMode',
      label: '字符值模式',
      component: 'Checkbox',
    },
    {
      field: 'bordered',
      label: '是否有边框',
      component: 'Checkbox',
    },
  ],
  InputTextArea: [
    {
      field: 'defaultValue',
      label: '默认值',
      component: 'Input',
      componentProps: {
        type: 'text',
        placeholder: '请输入默认值',
      },
    },
    {
      field: 'maxlength',
      label: '最大长度',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入最大长度',
      },
    },
    {
      field: 'minlength',
      label: '最小长度',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入最小长度',
      },
    },
    {
      field: 'cols',
      label: '可见列数',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入可见列数',
        min: 0,
      },
    },
    {
      field: 'rows',
      label: '可见行数',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入可见行数',
        min: 0,
      },
      defaultValue: 5,
    },

    {
      field: 'autosize',
      label: '自适应内容高度',
      component: 'Checkbox',
    },
    {
      field: 'showCount',
      label: '是否展示字数',
      component: 'Checkbox',
    },
    {
      field: 'readonly',
      label: '是否只读',
      component: 'Checkbox',
    },
    {
      field: 'spellcheck',
      label: '读写检查',
      component: 'Checkbox',
    },
    {
      field: 'autocomplete',
      label: '是否自动完成',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '正常', value: null },
          { label: '开', value: 'on' },
          { label: '关', value: 'off' },
        ],
      },
    },
    {
      field: 'autocorrect',
      label: '是否自动纠错',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '正常', value: null },
          { label: '开', value: 'on' },
          { label: '关', value: 'off' },
        ],
      },
    },
  ],
  Select: [
    {
      field: 'mode',
      label: '选择模式（默认单选）',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '单选', value: null },
          { label: '多选', value: 'multiple' },
          { label: '标签', value: 'tags' },
          // { label: '组合', value: 'combobox' },
        ],
      },
    },
    {
      field: 'autoClearSearchValue',
      label: '是否在选中项后清空搜索框',
      component: 'Checkbox',
    },
    {
      field: 'labelInValue',
      label: '选项的label包装到value中',
      component: 'Checkbox',
    },
    {
      field: 'showArrow',
      label: '显示下拉小箭头',
      component: 'Checkbox',
    },
    {
      field: 'defaultOpen',
      label: '默认展开下拉菜单',
      component: 'Checkbox',
    },
  ],
  Checkbox: [
    {
      field: 'indeterminate',
      label: '设置indeterminate状态',
      component: 'Checkbox',
    },
  ],
  CheckboxGroup: [],
  RadioGroup: [
    {
      field: 'defaultValue',
      label: '默认值',
      component: 'Input',
      componentProps: {
        placeholder: '请输入默认值',
      },
    },
    {
      field: 'buttonStyle',
      label: 'RadioButton的风格样式',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'outline',
            value: 'outline',
          },
          {
            label: 'solid',
            value: 'solid',
          },
        ],
      },
    },
    {
      field: 'optionType',
      label: 'options类型',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '按钮',
            value: 'button',
          },
        ],
        //根据其它选项的值更新自身控件配置值
        //compProp当前组件的属性，
        //configProps，当且组件的所有配置选项
        //self,当前配置的componentProps属性
        //返回真值进行更新
        // _propsFunc: (compProp, configProps, self) => {
        //   console.log("i'm called");
        //   console.log(compProp, configProps, self);
        //   if (compProp['buttonStyle'] && compProp['buttonStyle'] == 'outline') {
        //     if (!self['disabled']) {
        //       self['disabled'] = true;
        //       return 1;
        //     }
        //   } else {
        //     if (self['disabled']) {
        //       self['disabled'] = false;
        //       return 1;
        //     }
        //   }

        //   // return prop.optionType == 'button';
        // },
      },
    },
    {
      field: 'size',
      label: '尺寸',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '大',
            value: 'large',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],
  DatePicker: [
    {
      field: 'format',
      label: '展示格式（format）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD',
      },
    },
    {
      field: 'valueFormat',
      label: '绑定值格式（valueFormat）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD',
      },
    },
  ],
  RangePicker: [
    {
      field: 'placeholder',
      label: '占位符',
      children: [
        {
          field: '',
          label: '',
          component: 'Input',
        },
        {
          field: '',
          label: '',
          component: 'Input',
        },
      ],
    },
    {
      field: 'format',
      label: '展示格式（format）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    {
      field: 'valueFormat',
      label: '绑定值格式（valueFormat）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD',
      },
    },
  ],
  MonthPicker: [
    {
      field: 'format',
      label: '展示格式（format）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
    {
      field: 'valueFormat',
      label: '绑定值格式（valueFormat）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
  ],
  TimePicker: [
    {
      field: 'format',
      label: '展示格式（format）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
    {
      field: 'valueFormat',
      label: '绑定值格式（valueFormat）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
  ],
  Slider: [
    {
      field: 'defaultValue',
      label: '默认值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入默认值',
      },
      defaultValue: 1,
    },
    {
      field: 'min',
      label: '最小值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入最小值',
      },
      defaultValue: 0,
    },
    {
      field: 'max',
      label: '最大值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入最大值',
      },
      defaultValue: 100,
    },
    {
      field: 'step',
      label: '步长',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入步长',
      },
      defaultValue: 1,
    },
    {
      field: 'tooltipPlacement',
      label: 'Tooltip 展示位置',
      component: 'Select',
      componentProps: {
        options: [
          { value: 'top', label: '上' },
          { value: 'left', label: '左' },
          { value: 'right', label: '右' },
          { value: 'bottom', label: '下' },
          { value: 'topLeft', label: '上右' },
          { value: 'topRight', label: '上左' },
          { value: 'bottomLeft', label: '右下' },
          { value: 'bottomRight', label: '左下' },
          { value: 'leftTop', label: '左下' },
          { value: 'leftBottom', label: '左上' },
          { value: 'rightTop', label: '右下' },
          { value: 'rightBottom', label: '右上' },
        ],
      },
    },
    {
      field: 'tooltipVisible',
      label: '始终显示Tooltip',
      component: 'Checkbox',
    },
    {
      field: 'dots',
      label: '只能拖拽到刻度上',
      component: 'Checkbox',
    },
    {
      field: 'range',
      label: '双滑块模式',
      component: 'Checkbox',
    },
    {
      field: 'reverse',
      label: '反向坐标轴',
      component: 'Checkbox',
    },
    {
      field: 'vertical',
      label: '垂直方向',
      component: 'Checkbox',
    },
    {
      field: 'included',
      label: '值为包含关系',
      component: 'Checkbox',
    },
  ],
  Rate: [
    {
      field: 'defaultValue',
      label: '默认值',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入默认值',
      },
    },
    {
      field: 'character',
      label: '自定义字符',
      component: 'Input',
      componentProps: {
        placeholder: '请输入自定义字符',
      },
    },
    {
      field: 'count',
      label: 'start 总数',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入自定义字符',
      },
    },
  ],
  Switch: [
    {
      field: 'checkedChildren',
      label: '选中时的内容',
      component: 'Input',
      componentProps: {
        placeholder: '请输入选中时的内容',
      },
    },
    {
      field: 'checkedValue',
      label: '选中时的值',
      component: 'Input',
      componentProps: {
        placeholder: '请输入选中时的值',
      },
    },
    {
      field: 'unCheckedChildren',
      label: '非选中时的内容',
      component: 'Input',
      componentProps: {
        placeholder: '请输入非选中时的内容',
      },
    },
    {
      field: 'unCheckedValue',
      label: '非选中时的值',
      component: 'Input',
      componentProps: {
        placeholder: '请输入非选中时的值',
      },
    },
    {
      field: 'loading',
      label: '加载中的开关',
      component: 'Checkbox',
    },
    {
      field: 'size',
      label: '尺寸',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],
  TreeSelect: [
    {
      field: 'defaultValue',
      label: '默认值',
      component: 'Input',
      componentProps: {
        placeholder: '请输入默认值',
      },
    },
    {
      field: 'searchPlaceholder',
      label: '搜索框默认文字',
      component: 'Input',
      componentProps: {
        placeholder: '请输入搜索框默认文字',
      },
    },
    {
      field: 'treeNodeFilterProp',
      label: '输入项过滤对应的 treeNode 属性',
      component: 'Input',
      componentProps: {
        defaultValue: 'value',
      },
    },
    {
      field: 'treeNodeLabelProp',
      label: '作为显示的 prop 设置',
      component: 'Input',
      componentProps: {
        defaultValue: 'title',
      },
    },
    {
      field: 'popupClassName',
      label: '下拉菜单的 className 属性',
      component: 'Input',
      componentProps: {
        placeholder: '请输入下拉菜单的 className 属性',
      },
    },

    {
      field: 'labelInValue',
      label: '选项的label包装到value中',
      component: 'Checkbox',
    },
    {
      field: 'treeIcon',
      label: '展示TreeNode title前的图标',
      component: 'Checkbox',
    },
    {
      field: 'treeCheckable',
      label: '选项可勾选',
      component: 'Checkbox',
    },
    {
      field: 'treeCheckStrictly',
      label: '节点选择完全受控',
      component: 'Checkbox',
    },
    {
      field: 'treeDefaultExpandAll',
      label: '默认展开所有',
      component: 'Checkbox',
    },
    {
      field: 'treeLine',
      label: '是否展示线条样式',
      component: 'Checkbox',
    },
    {
      field: 'maxTagCount',
      label: '最多显示多少个 tag',
      component: 'InputNumber',
      componentProps: {
        placeholder: '最多显示多少个 tag',
      },
    },
    {
      field: 'size',
      label: '尺寸',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],
  Cascader: [
    {
      field: 'expandTrigger',
      label: '次级展开方式(默认click)',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'click',
            value: 'click',
          },
          {
            label: 'hover',
            value: 'hover',
          },
        ],
      },
    },
  ],
  Button: [
    {
      field: 'type',
      label: '类型',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'default',
            value: 'default',
          },
          {
            label: 'primary',
            value: 'primary',
          },
          {
            label: 'text',
            value: 'text',
          },
          {
            label: 'dashed',
            value: 'dashed',
          },
          {
            label: 'link',
            value: 'link',
          },
        ],
      },
    },
    {
      field: 'handle',
      label: '操作',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '提交',
            value: 'submit',
          },
          {
            label: '重置',
            value: 'reset',
          },
        ],
      },
    },
  ],
  Upload: [
    {
      field: 'action',
      label: '上传地址',
      component: 'Input',
    },
    {
      field: 'name',
      label: '附件参数名（name）',
      component: 'Input',
    },
  ],
  ColorPicker: [
    {
      field: 'defaultValue',
      label: '默认值',
      component: 'AColorPicker',
    },
  ],
  slot: [
    {
      field: 'slotName',
      label: '插槽名称',
      component: 'Input',
    },
  ],
  Transfer: [
    // {
    //   field: 'operations',
    //   label: '操作文案集合，顺序从上至下',
    //   component: 'Input',
    //   componentProps: {
    //     type: 'text',
    //     // defaultValue: ['>', '<'],
    //   },
    // },
    // {
    //   field: 'titles',
    //   label: '标题集合，顺序从左至右',
    //   component: 'Input',
    //   componentProps: {
    //     type: 'text',
    //     // defaultValue: ['', ''],
    //   },
    // },
    {
      field: 'oneWay',
      label: '展示为单向样式',
      component: 'Checkbox',
    },
    {
      field: 'pagination',
      label: '使用分页样式',
      component: 'Checkbox',
    },
    {
      field: 'showSelectAll',
      label: '展示全选勾选框',
      component: 'Checkbox',
    },
  ],
};

function deleteProps(list: Omit<IBaseFormAttrs, 'tag'>[], key: string) {
  list.forEach((element, index) => {
    if (element.name == key) {
      list.splice(index, 1);
    }
  });
}

componentAttrs['StrengthMeter'] = componentAttrs['Input'];
componentAttrs['StrengthMeter'].push({
  field: 'visibilityToggle',
  label: '是否显示切换按钮',
  component: 'Checkbox',
});

deleteProps(componentAttrs['StrengthMeter'], 'type');
deleteProps(componentAttrs['StrengthMeter'], 'prefix');
deleteProps(componentAttrs['StrengthMeter'], 'defaultValue');
deleteProps(componentAttrs['StrengthMeter'], 'suffix');
//组件属性
// name 控件的属性
export const baseComponentAttrs: IBaseComponentProps = componentAttrs;

//在所有的选项中查找需要配置项
export const findComponentProps = (props, name) => {
  const idx = props.findIndex((value: BaseFormAttrs) => {
    return value.field === name;
  });
  if (props[idx] && props[idx].componentProps) {
    return props[idx].componentProps;
  }
};

// 根据其它选项的值更新自身控件配置值
export const componentPropsFuncs = {
  RadioGroup: (compProp, options: BaseFormAttrs[]) => {
    const props = findComponentProps(options, 'size');
    if (props) {
      if (compProp['optionType'] && compProp['optionType'] != 'button') {
        props['disabled'] = true;
        compProp['size'] = null;
      } else {
        props['disabled'] = false;
      }
    }
  },
};
