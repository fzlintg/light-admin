//import { optionsListApi } from '@/api/demo/select';

export default [
  {
    field: 'mode',
    label: '模式',
    component: 'Select',
    componentProps: {
      options: [
        { label: '单选', value: '' },
        { label: '多选', value: 'multiple' },
        { label: '允许输入多选', value: 'tags' },
      ],
    },
  },
];
