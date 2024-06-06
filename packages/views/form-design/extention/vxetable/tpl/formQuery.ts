// import { VXETable, VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table';
// import XEUtils from 'xe-utils';

export const name = '完整表格';
// export const schema = {
//   componentProps: {
//     chartVar__func: `const config=await axios.get({url:"/table/getVxeColumn"});
// return config`,
//   },
// };
export const schema = {
  componentProps: {
    ds: {
      column: {
        sourceType: 'serv',
        service: '/vxe/fullColumn',
      },
    },
    gridVar__func: `const config=await axios.get({url:"/vxe/getGridVar"});
return config`,
  },
};
export default {
  border: true,
  showHeaderOverflow: true,
  showOverflow: true,
  keepSource: true,
  id: 'full_edit_1',
  height: 600,
  rowConfig: {
    keyField: 'id',
    isHover: true,
  },
  columnConfig: {
    resizable: true,
  },
  customConfig: {
    storage: true,
    checkMethod__func: `if (['nickname', 'role'].includes(column.field)) {
      return false;
    }
    return true;`,
    checkMethod__params: ['{column}'],
  },
  printConfig: {
    //columns__var: `{printColumns}`,
  },
  sortConfig: {
    trigger: 'cell',
    remote: true,
  },
  filterConfig: {
    remote: true,
  },
  pagerConfig: {
    enabled: true,

    pageSize: 10,
    pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
  },
  validConfig: {
    msgMode: 'full', // 设置为支持显示多个校验消息
  },
  formConfig: {
    titleWidth: 100,
    titleAlign: 'right',
    items: [
      {
        field: 'name',
        title: '名称',
        span: 8,
        titlePrefix: { message: '名称', icon: 'vxe-icon-question-circle-fill' },
        itemRender: { name: 'VxeInput', props: { placeholder: '请输入名称' } },
      },
      {
        field: 'email',
        title: '邮件',
        span: 8,
        titlePrefix: {
          useHTML: true,
          message: `点击链接`,
        },
        itemRender: { name: 'VxeInput', props: { placeholder: '请输入邮件' } },
      },
      {
        field: 'nickname',
        title: '昵称',
        span: 8,
        itemRender: { name: 'VxeInput', props: { placeholder: '请输入昵称' } },
      },
      {
        field: 'role',
        title: '角色',
        span: 8,
        folding: true,
        itemRender: { name: 'VxeInput', props: { placeholder: '请输入角色' } },
      },
      {
        field: 'sex',
        title: '性别',
        span: 8,
        folding: true,
        titleSuffix: { message: '注意，必填信息！', icon: 'vxe-icon-question-circle-fill' },
        itemRender: { name: 'VxeSelect', options: [] },
      },
      {
        field: 'age',
        title: '年龄',
        span: 8,
        folding: true,
        itemRender: {
          name: 'VxeInput',
          props: { type: 'number', min: 1, max: 120, placeholder: '请输入年龄' },
        },
      },
      {
        span: 24,
        align: 'center',
        collapseNode: true,
        itemRender: {
          name: 'VxeButtonGroup',
          options: [
            { type: 'submit', content: '搜索', status: 'primary' },
            { type: 'reset', content: '重置' },
          ],
        },
      },
    ],
  },
  toolbarConfig: {
    buttons: [
      { code: 'insert_actived', name: '新增' },
      { code: 'delete', name: '直接删除' },
      { code: 'mark_cancel', name: '删除/取消' },
      { code: 'save', name: '保存', status: 'success' },
    ],
    refresh: true, // 显示刷新按钮
    import: true, // 显示导入按钮
    export: true, // 显示导出按钮
    print: true, // 显示打印按钮
    zoom: true, // 显示全屏按钮
    custom: true, // 显示自定义列按钮
  },
  proxyConfig: {
    seq: true, // 启用动态序号代理，每一页的序号会根据当前页数变化
    sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
    filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
    form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
    props: {
      // 对应响应结果 Promise<{ result: [], page: { total: 100 } }>
      result: 'result', // 配置响应结果列表字段
      total: 'page.total', // 配置响应结果总页数字段
    },
    // 只接收Promise，具体实现自由发挥
    ajax: {
      // 当点击工具栏查询按钮或者手动提交指令 query或reload 时会被触发
      query__params: ['{ page, sorts, filters, form }'],
      query__func: `const queryParams = Object.assign({}, form);
        const firstSort = sorts[0];
        if (firstSort) {
          queryParams.sort = firstSort.field;
          queryParams.order = firstSort.order;
        }
        filters.forEach(({ field, values }) => {
          queryParams[field] = values.join(',');
        });
        return await axios.post({url:'/vxe/getTableData',data:{queryParams,page}});
      `,
      // 当点击工具栏删除按钮或者手动提交指令 delete 时会被触发
      delete__func: `return await axios.post({url:'/vxe/delete',data:{body}})`,
      delete__params: ['{body}'],

      // 当点击工具栏保存按钮或者手动提交指令 save 时会被触发
      save__func: `return await axios.post({url:'/vxe/save',data:{body}})`,
      save__params: ['{body}'],
    },
  },

  checkboxConfig: {
    labelField: 'id',
    reserve: true,
    highlight: true,
    range: true,
  },
  editRules: {
    name: [
      { required: true, message: '名称必填' },
      { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' },
    ],
    email: [{ required: true, message: '邮件必须填写' }],
    role: [{ required: true, message: '角色必须填写' }],
  },
  editConfig: {
    trigger: 'click',
    mode: 'row',
    showStatus: true,
  },
};
