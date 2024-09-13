export const name = '文件管理';
export const schema = [    {
  component: 'Upload',
  label: '上传',
  icon: 'ant-design:upload-outlined',
  field: '',
  colProps: { span: 24 },
  componentProps: {
    api: () => 1,
  },
},]