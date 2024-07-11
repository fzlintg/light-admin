export default {
  schemas: [
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '对话框',
        width: 1000,
        slots: {},
        onOkButtonClick__func: ` let data=await this.itemRef('modal').getFormModel();
        let result=await axios.post({url:'/api/crud/updateByUnique/base/sys_table',data:{data:{config:data,title:'sys_table'}
          ,where:{name:'sys_table',db_id:2}
        }});
        `,
        onOkButtonClick__params: ['{_this,callback}'],
        onCancelButtonClick__func: `      `,
        onDialogOpened__func: `      `,
        onDialogOpened__params: ['{fData,eData}'],
        onDialogBeforeClose__func: `      `,
        onDialogBeforeClose__params: ['{callback}'],
        maxLength: 100,
      },
      children: [
        {
          component: 'Tabs',
          label: '标签页',
          type: 'gridContainer',
          componentProps: {
            onChange__func: `      `,
            onChange__params: ['key'],
          },
          columns: [
            {
              label: '属性配置',
              children: [
                {
                  component: 'SubForm',
                  label: '单行表单',
                  field: 'items',
                  type: 'containerItem',
                  formItem: true,
                  componentProps: {
                    onRowDelete__params: ['{idx,data,row}'],
                    onRowInsert__params: ['{idx,data,row}'],
                    onRowAdd__params: ['{idx,data,row}'],
                    onRowChange__params: ['data'],
                  },
                  children: [
                    {
                      component: 'Input',
                      label: '字段',
                      field: 'name',
                      colProps: {
                        span: 24,
                      },
                      componentProps: {
                        type: 'text',
                        defaultValue: '',
                        onChange__func: `      `,
                        readonly: true,
                        disabled: false,
                      },
                      _type: 'custom',
                      width: '200px',
                      itemProps: {
                        labelCol: {},
                        wrapperCol: {},
                      },
                    },
                    {
                      component: 'Input',
                      label: '中文名称',
                      field: 'title',
                      colProps: {
                        span: 24,
                      },
                      componentProps: {
                        type: 'text',
                        defaultValue: '',
                        onChange__func: `      `,
                        disabled: false,
                      },
                      _type: 'custom',
                      width: '200px',
                      itemProps: {
                        labelCol: {},
                        wrapperCol: {},
                      },
                    },
                  ],
                  options: {
                    gutter: 0,
                  },
                  _type: 'custom',
                  width: '200px',
                  colProps: {
                    span: 24,
                  },
                  itemProps: {
                    labelCol: {},
                    wrapperCol: {},
                  },
                },
              ],
            },
            {
              label: '属性展示',
              children: [
                {
                  component: 'JsonViewer',
                  label: 'JSON展示',
                  type: 'showItem',
                  componentProps: {
                    defaultValue: {
                      demo: 1,
                    },
                    theme: 'light',
                    sort: true,
                    boxed: true,
                    copyable: true,
                    expandDepth: 3,
                    expanded: false,
                    onKeyClick__func: `    `,
                    timeformat__func: `  time => time.toLocaleString()  `,
                    showArrayIndex: true,
                    showDoubleQuotes: false,
                  },
                  _type: 'custom',
                  width: '200px',
                  colProps: {
                    span: 24,
                  },
                  field: 'items',
                  itemProps: {
                    labelCol: {},
                    wrapperCol: {},
                  },
                },
              ],
            },
          ],
          colProps: {
            span: 24,
          },
          _type: 'custom',
          width: '200px',
          field: 'tabs_1',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
      ],
      _type: 'custom',
      width: '200px',
      colProps: {
        span: 24,
      },
      field: 'modal',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
  ],
  layout: 'horizontal',
  labelLayout: 'flex',
  labelWidth: 100,
  labelCol: {},
  wrapperCol: {},
};
