export const name = '简单表格';
export const schema = {
  componentProps: {
    custom: {
      actions: [],
    },
    gridVar__func: ``,
    ds: {
      column: {
        sourceType: 'serv',
        service: '/vxe/simpleColumns',
      },
    },
  },
};
export default {
  border: true,
  height: 300,
  align: null,
  columnConfig: {
    resizable: true,
  },
  columns: [],
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons',
    },
  },
  proxyConfig: {
    ajax: {
      query__func: `return await axios.post({params:{
          page: page.currentPage,
          pageSize: page.pageSize,
          ...form},url:"/vxe/getBasicData"})
        `,
      query__params: ['page', 'form'],
    },
  },
};
