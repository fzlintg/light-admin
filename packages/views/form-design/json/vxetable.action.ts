export default {
  schemas: [
    {
      component: 'Button',
      formItem: false,
      type: 'showItem',
      label: '操作栏编辑',
      field: 'button_1',
      colProps: {
        span: 24,
      },
      hiddenLabel: true,
      componentProps: {
        value: 'primary',
        type: 'primary',
        size: 'default',
        onClick__func: `let formData=this.getFormData()                                     
           this.getItemRef("modal").show(formData)                                     `,
        style: '',
        shape: '',
        color: '',
        iconSize: 14,
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '操作栏编辑',
        width: 1000,
        slots: {},
        onOkButtonClick__func: `let formData=this.itemRef().getFormData();                                     
                                     let props=this.getFormData();                                     
                                     Object.assign(props,formData);                                    
                                     return true;                                     `,
        onCancelButtonClick__func: `                                                                          `,
        onDialogOpened__func: `                                    `,
        onDialogBeforeClose__func: `                                                                          `,
        style: '',
      },
      children: [
        {
          component: 'GridSubForm',
          label: '数据源配置',
          field: 'custom.actions',
          type: 'containerItem',
          formItem: true,
          componentProps: {
            onRowDelete__params: ['{idx,data,row}'],
            onRowInsert__params: ['{idx,data,row}'],
            onRowAdd__params: ['{idx,data,row}'],
            onRowChange__params: ['data'],
            style: '',
            onRowDelete__func: `                                                                          `,
            onRowInsert__func: `                                                                          `,
            onRowAdd__func: `                                                                          `,
            onRowChange__func: `                                                                          `,
            hideSub: true,
          },
          children: [
            {
              component: 'Input',
              label: '按钮名称',
              field: 'label',
              colProps: {
                span: 8,
              },
              componentProps: {
                type: 'text',
                placeholder: '',
                style: '',
                defaultValue: '',
                prefix: '',
                suffix: '',
                addonBefore: '',
                addonAfter: '',
                maxLength: 100,
              },
              defaultValue: '',
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'RadioButtonGroup',
              label: '颜色',
              field: 'color',
              colProps: {
                span: 8,
              },
              componentProps: {
                options: [
                  {
                    label: '错误',
                    value: 'error',
                  },
                  {
                    label: '成功',
                    value: 'success',
                  },
                ],
                style: '',
              },
              defaultValue: '',
              _type: 'custom',
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'CodeInput',
              label: '点击事件',
              componentProps: {
                buttonText: '编辑',
                mode: 'json',
                editorTitle: '代码编辑',
                bordered: true,
                autoFormat: true,
                readonly: false,
                style: '',
                prefix: 'function({ record, tableRef }){',
                suffix: '}',
              },
              defaultValue: '',
              _type: 'custom',
              width: '200px',
              colProps: {
                span: 8,
              },
              field: 'onClick__func',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'Input',
              label: '弹框确认信息',
              field: 'popConfirm.title',
              colProps: {
                span: 12,
              },
              componentProps: {
                type: 'text',
                placeholder: '',
                style: '',
                defaultValue: '',
                prefix: '',
                suffix: '',
                addonBefore: '',
                addonAfter: '',
                maxLength: 100,
                hideSub: true,
              },
              defaultValue: '',
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'CodeInput',
              label: '弹框确认函数',
              componentProps: {
                buttonText: '编辑',
                mode: 'json',
                editorTitle: '代码编辑',
                bordered: true,
                autoFormat: true,
                readonly: false,
                style: '',
                hideSub: true,
                prefix: 'function({ record, tableRef }){',
                suffix: '}',
              },
              defaultValue: '',
              _type: 'custom',
              width: '200px',
              colProps: {
                span: 13,
              },
              field: 'popConfirm.confirm__func',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
          ],
          colProps: {
            span: 24,
          },
          options: {
            gutter: 0,
          },
          _type: 'custom',
          width: '200px',
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
    {
      component: 'Button',
      formItem: false,
      type: 'showItem',
      label: '工具栏编辑',
      field: 'button_10',
      colProps: {
        span: 24,
      },
      hiddenLabel: true,
      componentProps: {
        value: 'primary',
        type: 'primary',
        size: 'default',
        onClick__func: `                                 let formData=this.getFormData()                                     
                                             this.getItemRef("modal_2").show(formData)                                 `,
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '对话框',
        width: 1000,
        slots: {},
        onOkButtonClick__func: `   let formData=this.itemRef().getFormData();                                     
   let props=this.getFormData();                                     
   Object.assign(props,formData);                                    
   return true;                                     `,
        onCancelButtonClick__func: `                                                                  `,
        onDialogOpened__func: `                                                                  `,
        onDialogBeforeClose__func: `                                                                  `,
      },
      children: [
        {
          component: 'GridSubForm',
          label: '多行表单',
          field: 'gridOptions.toolbarConfig.buttons',
          type: 'containerItem',
          formItem: true,
          componentProps: {
            onRowDelete__params: ['{idx,data,row}'],
            onRowInsert__params: ['{idx,data,row}'],
            onRowAdd__params: ['{idx,data,row}'],
            onRowChange__params: ['data'],
            hideSub: true,
          },
          children: [
            {
              component: 'Input',
              label: '按钮内容',
              field: 'content',
              colProps: {
                span: 12,
              },
              componentProps: {
                type: 'text',
                defaultValue: '',
              },
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'Select',
              label: '按钮渲染组件',
              field: 'buttonRender.name',
              colProps: {
                span: 12,
              },
              componentProps: {
                options: [
                  {
                    label: 'ant按钮',
                    value: 'AButton',
                  },
                ],
              },
              defaultValue: null,
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'RadioButtonGroup',
              label: '风格',
              field: 'buttonRender.props.type',
              colProps: {
                span: 12,
              },
              componentProps: {
                options: [
                  {
                    label: 'primary',
                    value: 'primary',
                  },
                  {
                    label: 'success',
                    value: 'success',
                  },
                  {
                    label: 'warning',
                    value: 'warning',
                  },
                ],
              },
              defaultValue: '',
              _type: 'custom',
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'IconPicker',
              label: '图标选择',
              colProps: {
                span: 12,
              },
              field: 'buttonRender.props.preIcon',
              componentProps: {},
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'CodeInput',
              label: '点击事件',
              componentProps: {
                buttonText: '编辑',
                mode: 'json',
                editorTitle: '代码编辑',
                bordered: true,
                autoFormat: true,
                readonly: false,
                prefix: 'function({tableRef,createMessage}){',
                suffix: '}',
              },
              defaultValue: '',
              _type: 'custom',
              width: '200px',
              colProps: {
                span: 12,
              },
              field: 'buttonRender.events.click__func',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
          ],
          colProps: {
            span: 24,
          },
          options: {
            gutter: 0,
          },
          _type: 'custom',
          width: '200px',
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
      field: 'modal_2',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Button',
      formItem: false,
      type: 'showItem',
      label: '数据列编辑',
      field: 'button_5',
      colProps: {
        span: 24,
      },
      hiddenLabel: true,
      componentProps: {
        value: 'primary',
        type: 'primary',
        size: 'default',
        onClick__func: `    ;let formData=this.getFormData()                                     
       this.getItemRef("modal_6").show(formData)       `,
        onClick__params: ['e'],
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '对话框',
        width: 1000,
        slots: {},
        onOkButtonClick__func: `   let formData=this.itemRef().getFormData();                                     
   let props=this.getFormData();                                     
   Object.assign(props,formData);                                    
   return true;    `,
        onOkButtonClick__params: ['{_this,callback}'],
        onCancelButtonClick__func: `              `,
        onDialogOpened__func: `              `,
        onDialogOpened__params: ['{fData,eData}'],
        onDialogBeforeClose__func: `              `,
        onDialogBeforeClose__params: ['{callback}'],
        maxLength: 100,
      },
      children: [
        {
          component: 'RadioGroup',
          label: 'CRUD类型',
          field: 'ds.column.sourceType',
          colProps: {
            span: 12,
          },

          componentProps: {
            buttonStyle: 'solid',
            options: [
              {
                label: '模型',
                value: 'model',
              },
              {
                label: '逻辑',
                value: 'logic',
              },
              {
                label: '服务',
                value: 'serv',
              },
            ],
            optionType: 'button',
          },
          width: '200px',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'ApiSelect',
          label: '服务',
          field: 'ds.column.service',
          componentProps: {
            api__func: `      return await axios.get({url:"/api/model/getList/"+params.keyword||'base'});      `,
            api__params: ['params'],
            onChange__func: `      console.log('ApiSelect====>:', e, v)      `,
            onChange__params: ['e', 'v'],
            defaultContext__var: `      {      
            apiselect_1: '1',      
      }      `,
            params__tpl: '{\n      id: ${apiselect_1},\n}',
            resultField: '',
            labelField: '',
            valueField: '',
            immediate: true,
            _update__func: `      await this.itemRef().run(this.item().formatTpl('params'))      `,
            onOptionsChange__func: ``,
            onOptionsChange__params: ['options'],
            onSearch__func: `   await this.itemRef().run({keyword})      `,
            onSearch__params: ['keyword'],
            showSearch: true,
            defaultActiveFirstOption: false,
            notFoundContent: '暂无数据',
            showArrow: true,
            filterOption: false,
            allowInput: true,
            defaultContext: {
              apiselect_1: '1',
            },
            params: {
              id: 1,
            },
          },
          colProps: {
            span: 12,
          },
          defaultValue: null,
          _type: 'custom',
          width: '200px',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
          rules: [
            {
              required: true,
            },
          ],
        },
        {
          component: 'Button',
          formItem: false,
          type: 'showItem',
          label: '初始化列',
          field: 'button_6',
          colProps: {
            span: 24,
          },
          hiddenLabel: true,
          componentProps: {
            value: 'primary',
            type: 'primary',
            size: 'default',
            onClick__func: `   let sourceType=this.getFormItem("ds.column.sourceType").getValue();   
               let service=this.getFormItem("ds.column.service").getValue();   
                  
               let result=sourceType=='serv'?(await axios.get({url:service})):   
               (await axios.get({url:'/api/'+sourceType+'/tableColumn/'+service}));   
               this.getFormItem("gridOptions.columns").setValue(result);   
                  `,
            onClick__params: ['e'],
          },
          width: '200px',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'GridSubForm',
          label: '多行表单',
          field: 'gridOptions.columns',
          type: 'containerItem',
          formItem: true,
          componentProps: {
            onRowDelete__params: ['{idx,data,row}'],
            onRowInsert__params: ['{idx,data,row}'],
            onRowAdd__params: ['{idx,data,row}'],
            onRowChange__params: ['data'],
            maxLength: 100,
          },
          children: [
            {
              component: 'Input',
              label: '字段',
              field: 'field',
              colProps: {
                span: 8,
              },
              componentProps: {
                type: 'text',
                defaultValue: '',
                onChange__func: `            `,
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
              label: '名称',
              field: 'title',
              colProps: {
                span: 8,
              },
              componentProps: {
                type: 'text',
                defaultValue: '',
                onChange__func: `            `,
              },
              _type: 'custom',
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
          ],
          colProps: {
            span: 24,
          },
          options: {
            gutter: 0,
          },
          _type: 'custom',
          width: '200px',
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
      field: 'modal_6',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Button',
      formItem: false,
      type: 'showItem',
      label: '数据代理编辑',
      field: 'button_2',
      colProps: {
        span: 24,
      },
      hiddenLabel: true,
      componentProps: {
        value: 'primary',
        type: 'primary',
        size: 'default',
        onClick__func: `   let formData=this.getFormData()                                     
   this.getItemRef("modal_3").show(formData)                           `,
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '对话框',
        width: 1000,
        slots: {},
        onOkButtonClick__func: `   let formData=this.getItemRef('modal_3').getFormData();                                     
   let props=this.getFormData();                                     
   Object.assign(props,formData);                                    
  
   return true;                           `,
        onCancelButtonClick__func: `                                                                `,
        onDialogOpened__func: `                                                                `,
        onDialogBeforeClose__func: `                                                                `,
      },
      children: [
        {
          component: 'CodeInput',
          label: '查询全部',
          componentProps: {
            buttonText: '编辑',
            mode: 'json',
            editorTitle: '代码编辑',
            bordered: true,
            autoFormat: true,
            readonly: false,
            prefix: 'async function(form){',
            suffix: '}',
            maxLength: 100,
          },
          defaultValue: '',
          _type: 'custom',
          width: '200px',
          colProps: {
            span: 12,
          },
          field: 'gridOptions.proxyConfig.ajax.queryAll__func',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'CodeInput',
          label: '查询函数',
          componentProps: {
            buttonText: '编辑',
            mode: 'json',
            editorTitle: '代码编辑',
            bordered: true,
            autoFormat: true,
            readonly: false,
            prefix: 'async function({ page, sorts, filters, form }){',
            suffix: '}',
          },
          defaultValue: '',
          _type: 'custom',
          width: '200px',
          colProps: {
            span: 12,
          },
          field: 'gridOptions.proxyConfig.ajax.query__func',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'CodeInput',
          label: '删除函数',
          componentProps: {
            buttonText: '编辑',
            mode: 'json',
            editorTitle: '代码编辑',
            bordered: true,
            autoFormat: true,
            readonly: false,
            prefix: 'async function({ page, sorts, filters, form }){',
            suffix: '}',
          },
          defaultValue: '',
          _type: 'custom',
          width: '200px',
          colProps: {
            span: 12,
          },
          field: 'gridOptions.proxyConfig.ajax.delete__func',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'CodeInput',
          label: '保存函数',
          componentProps: {
            buttonText: '编辑',
            mode: 'json',
            editorTitle: '代码编辑',
            bordered: true,
            autoFormat: true,
            readonly: false,
            prefix: 'async function({ page, sorts, filters, form }){',
            suffix: '}',
          },
          defaultValue: '',
          _type: 'custom',
          width: '200px',
          colProps: {
            span: 12,
          },
          field: 'gridOptions.proxyConfig.ajax.save__func',
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
      field: 'modal_3',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Button',
      formItem: false,
      type: 'showItem',
      label: '输入表单配置',
      field: 'button_4',
      colProps: {
        span: 24,
      },
      hiddenLabel: true,
      componentProps: {
        value: 'primary',
        type: 'primary',
        size: 'default',
        onClick__func: `   let formData=this.getFormData()                                     
   this.getItemRef("modal_5").show(formData)                       `,
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '对话框',
        width: 1000,
        slots: {},
        onOkButtonClick__func: `let formData=this.getItemRef('modal_5').getFormData();                                     
   let props=this.getFormData();                                    
   Object.assign(props,formData);                                    
   return true; `,
        onCancelButtonClick__func: `                                              `,
        onDialogOpened__func: `                                              `,
        onDialogBeforeClose__func: `                                              `,
      },
      children: [
        {
          component: 'GridSubForm',
          label: '多行表单',
          field: 'gridOptions.formConfig.items',
          type: 'containerItem',
          formItem: true,
          componentProps: {
            onRowDelete__params: ['{idx,data,row}'],
            onRowInsert__params: ['{idx,data,row}'],
            onRowAdd__params: ['{idx,data,row}'],
            onRowChange__params: ['data'],
            maxLength: 100,
          },
          children: [
            {
              component: 'Input',
              label: '字段',
              field: 'field',
              colProps: {
                span: 12,
              },
              componentProps: {
                type: 'text',
                defaultValue: '',
              },
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'Input',
              label: '名称',
              field: 'title',
              colProps: {
                span: 12,
              },
              componentProps: {
                type: 'text',
                defaultValue: '',
                max: 100,
                step: 1,
              },
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'Slider',
              label: '宽度',
              field: 'span',
              colProps: {
                span: 12,
              },
              componentProps: {
                max: 24,
                min: 0,
                defaultValue: 6,
                step: 1,
              },
              defaultValue: 0,
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'Select',
              label: '组件',
              field: 'itemRender.name',
              colProps: {
                span: 12,
              },
              componentProps: {
                options: [
                  {
                    label: '输入框',
                    value: 'AInput',
                  },
                  {
                    label: '下拉框',
                    value: 'AApiSelect',
                  },
                  {
                    label: '按钮组',
                    value: 'AButtonGroup',
                  },
                ],
                defaultValue: 'AInput',
                max: 100,
                step: 1,
                maxLength: 100,
                mode: null,
              },
              defaultValue: '',
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'Input',
              label: '前置提示',
              field: 'titlePrefix.message',
              colProps: {
                span: 12,
              },
              componentProps: {
                type: 'text',
                defaultValue: '',
                hideSub: true,
              },
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'Input',
              label: '展示类',
              field: 'className',
              colProps: {
                span: 12,
              },
              componentProps: {
                type: 'text',
                defaultValue: '',
                onChange__func: `  `,
                hideSub: true,
              },
              _type: 'custom',
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'RadioGroup',
              label: '位置',
              field: 'align',
              colProps: {
                span: 24,
              },
              componentProps: {
                options: [
                  {
                    label: '右',
                    value: 'right',
                  },
                  {
                    label: '左',
                    value: 'left',
                  },
                  {
                    label: '中',
                    value: 'center',
                  },
                ],
                optionType: 'button',
                buttonStyle: 'solid',
              },
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'CollapseContainer',
              label: '下拉数据源',
              formItem: false,
              type: 'container',
              componentProps: {
                title: '数据源',
                hideSub: true,
                maxLength: 100,
              },
              children: [
                {
                  component: 'CodeInput',
                  label: '下拉数据源',
                  componentProps: {
                    buttonText: '编辑',
                    mode: 'json',
                    editorTitle: '代码编辑',
                    bordered: true,
                    autoFormat: true,
                    readonly: false,
                    prefix: 'function(){',
                    suffix: '}',
                    maxLength: 100,
                  },
                  defaultValue: '',
                  _type: 'custom',
                  width: '200px',
                  colProps: {
                    span: 12,
                  },
                  field: 'itemRender.props.api__func',
                  itemProps: {
                    labelCol: {},
                    wrapperCol: {},
                  },
                },
                {
                  component: 'Input',
                  label: '标签字段',
                  field: 'itemRender.props.labelField',
                  colProps: {
                    span: 12,
                  },
                  componentProps: {
                    type: 'text',
                    defaultValue: 'name',
                  },
                  width: '200px',
                  itemProps: {
                    labelCol: {},
                    wrapperCol: {},
                  },
                },
                {
                  component: 'Input',
                  label: '结果字段',
                  field: 'itemRender.props.resultField',
                  colProps: {
                    span: 12,
                  },
                  componentProps: {
                    type: 'text',
                    defaultValue: 'list',
                  },
                  width: '200px',
                  itemProps: {
                    labelCol: {},
                    wrapperCol: {},
                  },
                },
                {
                  component: 'Input',
                  label: 'ID字段',
                  field: 'itemRender.props.valueField',
                  colProps: {
                    span: 12,
                  },
                  componentProps: {
                    type: 'text',
                    defaultValue: 'id',
                  },
                  width: '200px',
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
              field: 'collapsecontainer_1',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
            {
              component: 'GridSubForm',
              label: '按钮组配置',
              field: 'itemRender.children',
              type: 'containerItem',
              formItem: true,
              componentProps: {
                onRowDelete__params: ['{idx,data,row}'],
                onRowInsert__params: ['{idx,data,row}'],
                onRowAdd__params: ['{idx,data,row}'],
                onRowChange__params: ['data'],
                hideSub: true,
              },
              children: [
                {
                  component: 'RadioGroup',
                  label: '类型',
                  field: 'props.htmlType',
                  colProps: {
                    span: 12,
                  },
                  componentProps: {
                    options: [
                      {
                        label: '提交',
                        value: 'submit',
                      },
                      {
                        label: '重置',
                        value: 'reset',
                      },
                    ],
                    optionType: 'button',
                    maxLength: 100,
                  },
                  width: '200px',
                  itemProps: {
                    labelCol: {},
                    wrapperCol: {},
                  },
                },
                {
                  component: 'RadioGroup',
                  label: '风格',
                  field: 'props.type',
                  colProps: {
                    span: 12,
                  },
                  componentProps: {
                    buttonStyle: 'solid',
                    options: [
                      {
                        label: 'primary',
                        value: 'primary',
                      },
                      {
                        label: 'default',
                        value: 'default',
                      },
                    ],
                    optionType: 'button',
                    maxLength: 100,
                    hideSub: true,
                  },
                  width: '200px',
                  itemProps: {
                    labelCol: {},
                    wrapperCol: {},
                  },
                },
                {
                  component: 'Input',
                  label: '按钮名称',
                  field: 'props.content',
                  colProps: {
                    span: 12,
                  },
                  componentProps: {
                    type: 'text',
                    defaultValue: '',
                    ds: '',
                  },
                  width: '200px',
                  itemProps: {
                    labelCol: {},
                    wrapperCol: {},
                  },
                },
              ],
              colProps: {
                span: 24,
              },
              options: {
                gutter: 0,
              },
              _type: 'custom',
              width: '200px',
              itemProps: {
                labelCol: {},
                wrapperCol: {},
              },
            },
          ],
          colProps: {
            span: 24,
          },
          options: {
            gutter: 0,
          },
          _type: 'custom',
          width: '200px',
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
      field: 'modal_5',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Button',
      formItem: false,
      type: 'showItem',
      label: 'vxe基础配置',
      field: 'button_3',
      colProps: {
        span: 24,
      },
      hiddenLabel: true,
      componentProps: {
        value: 'primary',
        type: 'primary',
        size: 'default',
        onClick__func: `   let formData=this.getFormData()                                     
   this.getItemRef("modal_4").show(formData)                           `,
      },
      width: '200px',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Modal',
      label: '对话框',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '对话框',
        width: 1000,
        slots: {},
        onOkButtonClick__func: `let formData=this.getItemRef('modal_4').getFormData();                                     
   let props=this.getFormData();                                     
   Object.assign(props,formData);                                    
   return true;                      `,
        onCancelButtonClick__func: `                                                        `,
        onDialogOpened__func: `                                                        `,
        onDialogBeforeClose__func: `                                                        `,
      },
      children: [
        {
          component: 'Divider',
          label: '可编辑项配置',
          colProps: {
            span: 24,
          },
          field: 'divider_3',
          componentProps: {
            orientation: 'center',
            dashed: true,
          },
          width: '200px',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'RadioButtonGroup',
          label: '触发方式',
          field: 'gridOptions.editConfig.trigger',
          colProps: {
            span: 12,
          },
          componentProps: {
            options: [
              {
                label: '点击',
                value: 'click',
              },
              {
                label: '双击',
                value: 'dblclick',
              },
              {
                label: '手动',
                value: 'manual',
              },
            ],
          },
          defaultValue: '',
          _type: 'custom',
          width: '200px',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'RadioButtonGroup',
          label: '编辑模式',
          field: 'gridOptions.editConfig.mode',
          colProps: {
            span: 12,
          },
          componentProps: {
            options: [
              {
                label: '单元格',
                value: 'cell',
              },
              {
                label: '行',
                value: 'row',
              },
            ],
          },
          defaultValue: '',
          _type: 'custom',
          width: '200px',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'Checkbox',
          label: '显示修改状态',
          colProps: {
            span: 12,
          },
          field: 'gridOptions.editConfig.showStatus',
          componentProps: {
            defaultValue: false,
          },
          width: '200px',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
        },
        {
          component: 'InputNumber',
          label: '表格高度',
          field: 'gridOptions.height',
          colProps: {
            span: 8,
          },
          componentProps: {
            style: 'width:200px',
            defaultValue: 600,
          },
          width: '200px',
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
      field: 'modal_4',
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
