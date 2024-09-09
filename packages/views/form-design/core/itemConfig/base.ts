export const name = '基础组件';
export const schema = [
  {
    component: 'StrengthMeter',
    label: '密码强度',
    icon: 'wpf:password1',
    colProps: { span: 24 },
    field: '',
    componentProps: {},
  },
  // {
  //   component: 'AutoComplete',
  //   label: '自动完成',
  //   icon: 'wpf:password1',
  //   colProps: { span: 24 },
  //   field: '',
  //   componentProps: {
  //     placeholder: '请输入正则表达式',
  //     options: [
  //       {
  //         value: '/^(?:(?:\\+|00)86)?1[3-9]\\d{9}$/',
  //         label: '手机号码',
  //       },
  //       {
  //         value: '/^((ht|f)tps?:\\/\\/)?[\\w-]+(\\.[\\w-]+)+:\\d{1,5}\\/?$/',
  //         label: '网址带端口号',
  //       },
  //     ],
  //   },
  // },
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

  // {
  //   component: 'Input',
  //   label: '输入框',
  //   icon: 'bi:input-cursor-text',
  //   field: '',
  //   colProps: { span: 24 },
  //   componentProps: {
  //     type: 'text',
  //     defaultValue: '',
  //     onChange__func: '',
  //   },
  // },
  // {
  //   component: 'Input',
  //   label: '输入框',
  //   icon: 'bi:input-cursor-text',
  //   field: '',
  //   colProps: { span: 24 },
  //   componentProps: {
  //     type: 'text',
  //     defaultValue: '',
  //     onChange__func: '',
  //     readonly: false,
  //   },
  // },

  // {
  //   component: 'Radio',
  //   label: '单选框',
  //   icon: 'ant-design:check-circle-outlined',
  //   field: '',
  //   colProps: { span: 24 },
  //   componentProps: {},
  //   defaultValue: false,
  // },

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
    component: 'Upload',
    label: '上传',
    icon: 'ant-design:upload-outlined',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      api: () => 1,
    },
  },

  // {
  //   component: 'ColorPicker',
  //   label: '颜色选择',
  //   icon: 'carbon:color-palette',
  //   field: '',
  //   colProps: { span: 24 },
  //   componentProps: {

  //     value: '',
  //   },
  //   defaultValue:''
  // },

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
];
