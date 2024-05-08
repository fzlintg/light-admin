import { optionsListApi } from '@/api/demo/select';

export default {
  component: 'ApiRadioGroup',
  label: 'API单选',
  icon: 'ant-design:check-circle-outlined',
  //  helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
  required: true,
  componentProps: {
    api: optionsListApi,
    params: {
      count: 2,
    },
    resultField: 'list',
    // use name as label
    labelField: 'name',
    // use id as value
    valueField: 'id',
  },
  defaultValue: null,
  colProps: {
    span: 8,
  },
};
