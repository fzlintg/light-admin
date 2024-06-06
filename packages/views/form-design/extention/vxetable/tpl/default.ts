export const name = '默认表格';
export const schema = {
  componentProps: {
    gridVar__func: `const config=await axios.get({url:"/vxe/getGridVar"});
    return config`,
    ds: {
      column: {
        sourceType: 'serv',
        service: '/table/getVxeColumn',
      },
    },
    custom: {
      actions: [
        {
          label: '详情',
          onClick__func: `console.log(record);`,
        },
        {
          label: '编辑',
          onClick__func: ``,
        },
        {
          label: '删除',
          color: 'error',
          popConfirm: {
            title: '是否确认删除',
            confirm__func: `tableRef.value?.remove(record);`,
          },
        },
      ],
    },
  },
};

export default {
  editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
  formConfig: {
    items: [
      {
        field: 'field0',
        title: 'field0',
        itemRender: {
          name: 'AInput',
        },
        span: 6,
      },
      {
        field: 'field1',
        title: 'field1',
        itemRender: {
          name: 'AApiSelect',
          props: {
            api__func: `return await axios.get({url:"/select/getDemoOptions"});
           `,
            //    api: optionsListApi,
            resultField: 'list',
            labelField: 'name',
            valueField: 'id',
          },
        },
        span: 6,
      },
      {
        span: 12,
        align: 'right',
        className: '!pr-0',
        itemRender: {
          name: 'AButtonGroup',
          children: [
            {
              props: { type: 'primary', content: '查询', htmlType: 'submit' },
              attrs: { class: 'mr-2' },
            },
            { props: { type: 'default', htmlType: 'reset', content: '重置' } },
          ],
        },
      },
    ],
  },
  proxyConfig: {
    ajax: {
      query__func: `return await axios.get({params:{
          page: page.currentPage,
          pageSize: page.pageSize,
          ...form},url:"/table/getDemoList"})
        `,
      query__params: ['page', 'form'],
      queryAll__func: `return await axios.get({url:"/table/getDemoList"})`,
      queryAll__params: ['form'],
    },
  },
  toolbarConfig: {
    buttons: [
      {
        content: '在第一行新增',
        buttonRender: {
          name: 'AButton',
          props: {
            type: 'primary',
            preIcon: 'mdi:page-next-outline',
          },
          events: {
            click__func: `tableRef.value?.insert({ name: '新增的' });
createMessage.success('新增成功');`,
          },
        },
      },
      {
        content: '在最后一行新增',
        buttonRender: {
          name: 'AButton',
          props: {
            type: 'warning',
          },
          events: {
            click__func: `tableRef.value?.insertAt({ name: '新增的' }, -1);`,
          },
        },
      },
    ],
  },
};
