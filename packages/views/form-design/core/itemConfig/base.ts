export const name = '基础组件';
export const schema = [
  {
    component: 'InputCountDown',
    label: '倒计输入',
    icon: 'line-md:iconify2',
    colProps: { span: 24 },
    field: '',
    componentProps: {},
  },
  {
    component: 'IconPicker',
    label: '图标选择',
    icon: 'line-md:iconify2',
    colProps: { span: 24 },
    field: '',
    componentProps: {},
  },
  {
    component: 'StrengthMeter',
    label: '密码强度',
    icon: 'wpf:password1',
    colProps: { span: 24 },
    field: '',
    componentProps: {},
  },
  {
    component: 'AutoComplete',
    label: '自动完成',
    icon: 'wpf:password1',
    colProps: { span: 24 },
    field: '',
    componentProps: {
      placeholder: '请输入正则表达式',
      options: [
        {
          value: '/^(?:(?:\\+|00)86)?1[3-9]\\d{9}$/',
          label: '手机号码',
        },
        {
          value: '/^((ht|f)tps?:\\/\\/)?[\\w-]+(\\.[\\w-]+)+:\\d{1,5}\\/?$/',
          label: '网址带端口号',
        },
      ],
    },
  },
  {
    component: 'Divider',
    label: '分割线',
    icon: 'radix-icons:divider-horizontal',
    colProps: { span: 24 },
    field: '',
    componentProps: {
      orientation: 'center',
      dashed: true,
    },
  },
  {
    component: 'Checkbox',
    label: '复选框',
    icon: 'ant-design:check-circle-outlined',
    colProps: { span: 24 },
    field: '',
    defaultValue: false,
  },
  {
    component: 'CheckboxGroup',
    label: '复选框组',
    icon: 'ant-design:check-circle-filled',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
    defaultValue: [],
  },
  {
    component: 'Input',
    label: '输入框',
    icon: 'bi:input-cursor-text',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      type: 'text',
    },
    defaultValue: '',
  },
  {
    component: 'InputNumber',
    label: '数字输入',
    icon: 'ant-design:field-number-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: { style: 'width:200px' },
    defaultValue: 0,
  },
  {
    component: 'InputTextArea',
    label: '文本域',
    icon: 'ant-design:file-text-filled',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
    defaultValue: '',
  },
  {
    component: 'Select',
    label: '下拉选择',
    icon: 'gg:select',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
    defaultValue: '',
  },

  {
    component: 'Radio',
    label: '单选框',
    icon: 'ant-design:check-circle-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
    defaultValue: false,
  },
  {
    component: 'RadioGroup',
    label: '单选框-组',
    icon: 'carbon:radio-button-checked',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    component: 'DatePicker',
    label: '日期选择',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
  },
  {
    component: 'RangePicker',
    label: '日期范围',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      placeholder: ['开始日期', '结束日期'],
    },
  },
  {
    component: 'MonthPicker',
    label: '月份选择',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      placeholder: '请选择月份',
    },
  },
  {
    component: 'TimePicker',
    label: '时间选择',
    icon: 'healthicons:i-schedule-school-date-time',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
  },
  {
    component: 'Slider',
    label: '滑动输入',
    icon: 'vaadin:slider',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
    defaultValue: 0,
  },
  {
    component: 'Rate',
    label: '评分',
    icon: 'ic:outline-star-rate',
    field: '',
    colProps: { span: 24 },
    componentProps: {},
    defaultValue: 0,
  },
  {
    component: 'Switch',
    label: '开关',
    icon: 'entypo:switch',

    colProps: { span: 24 },
    componentProps: {},
    defaultValue: false,
  },
  {
    component: 'TreeSelect',
    label: '树形选择',
    icon: 'clarity:tree-view-line',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      treeData: [
        {
          label: '选项1',
          value: '1',
          children: [
            {
              label: '选项三',
              value: '1-1',
            },
          ],
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    component: 'Upload',
    label: '上传',
    icon: 'ant-design:upload-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      api: () => 1,
    },
  },
  {
    component: 'Cascader',
    label: '级联选择',
    icon: 'ant-design:check-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          children: [
            {
              label: '选项三',
              value: '1-1',
            },
          ],
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
  {
    component: 'Button',
    formItem: false,
    type: 'showItem',
    label: '按钮',
    icon: 'dashicons:button',
    field: '',
    colProps: { span: 24 },
    hiddenLabel: true,
    componentProps: {
      value: 'primary',
      type: 'primary',
      size: 'default',
      onClick: () => {
        console.log('点击');
      },
      onClick__func: '',
    },
  },
  {
    component: 'ColorPicker',
    label: '颜色选择',
    icon: 'carbon:color-palette',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      defaultValue: '',
      value: '',
    },
  },

  {
    component: 'slot',
    label: '插槽',
    icon: 'vs:timeslot-question',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      slotName: 'slotName',
    },
  },
  {
    component: 'Transfer',
    label: '穿梭框',
    icon: 'bx:bx-transfer-alt',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      render: (item) => item.title,
      dataSource: [
        {
          key: 'key-1',
          title: '标题1',
          description: '描述',
          disabled: false,
          chosen: true,
        },
        {
          key: 'key-2',
          title: 'title2',
          description: 'description2',
          disabled: true,
        },
        {
          key: 'key-3',
          title: '标题3',
          description: '描述3',
          disabled: false,
          chosen: true,
        },
      ],
    },
  },
];
