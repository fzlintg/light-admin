export const name = '简单表格';
export const schema = {
  componentProps: {
    custom: {
      api: {
        columns: '',
      },
      actions: [],
    },
    gridVar__func: `const columns=[
      { type: 'seq', width: 50 },
      { field: 'name', title: 'name' },
      { field: 'sex', title: 'sex' },
      { field: 'address', title: 'Address' },
    ]
  
    return {
      columns
    }`,
  },
};
export default {
  border: true,
  height: 300,
  align: null,
  columnConfig: {
    resizable: true,
  },
  columns__var: `columns`,
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
