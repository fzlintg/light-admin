import { areaRecord } from '@/api/demo/cascader';
export default {
  component: 'ApiCascader',
  label: '级联选择',
  required: true,
  colProps: {
    span: 8,
  },
  componentProps: {
    api: areaRecord,
    api__func:"",
    apiParamKey: 'parentCode',
    // dataField: 'data',
    labelField: 'name',
    valueField: 'code',
    initFetchParams: {
      parentCode: '',
    },
    isLeaf: (record) => {
      return !(record.levelType < 3);
    },
    onChange: (e, ...v) => {
      console.log('ApiCascader====>:', e, v);
    },
    onChange__func:`console.log('ApiCascader====>:', e, v);`,
    onChange__params:['e','...v']
  },
};