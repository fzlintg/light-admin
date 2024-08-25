export default {
  label: '上传图片',
  icon: 'ant-design:export-outlined',
  componentProps: {
    showPreviewNumber: 1,
    emptyHidePreview: false,
    disabled: false,
    listType: 'picture-card',
    helpText: '',
    // 文件最大多少MB
    maxSize: 2,
    // 最大数量的文件，Infinity不限制
    maxNumber: 1,
    // 根据后缀，或者其他
    accept: ['jpg', 'png'],
    multiple: false,
    uploadParams: {},
    api__func: `
    return await axios.uploadFile(
      {
        url: 'http://localhost:7001/file/upload/base/image',
        onUploadProgress,
      },
    params,
    );`,
    api__params: ['params', 'onUploadProgress'],
    name: '',
    filename: '',
    fileListOpenDrag: true,
    fileListDragOptions: {},
    // support xxx.xxx.xx
    resultField: 'data',
  },
};
