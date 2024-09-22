export const name = '选择组件';
export const schema = [
  {
    component: 'IconPicker',
    label: '图标选择',
    icon: 'line-md:iconify2',
    colProps: { span: 24 },
    field: '',
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
    defaultValue: null,
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
      defaultValue: null,
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
