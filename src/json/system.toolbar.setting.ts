export default {
  schemas: [
    {
      component: 'Drawer',
      label: '设置',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '设置',
        slots: {},
        placement: 'right',
        onOkButtonClick__func: `  let data=await this.itemRef("drawer").getFormModel();  
          appStore.setLightFormConfig(data)  
          createMessage.success('保存成功');  
          return true;  
      `,
        onOkButtonClick__params: ['params'],
        onCancelButtonClick__func: `        `,
        onCancelButtonClick__params: ['params'],
        onDialogOpened__func: `        `,
        onDialogOpened__params: ['params'],
        onDialogBeforeClose__func: `        `,
        onDialogBeforeClose__params: ['params'],
        width: 378,
        zIndex: 1000,
        showOkBtn: true,
        showCancelBtn: true,
        showFooter: true,
      },
      children: [
        {
          component: 'Switch',
          label: '模式开关',
          colProps: {
            span: 24,
          },
          componentProps: {
            checkedChildren: '服务',
            checkedValue: true,
            unCheckedChildren: '本地',
            unCheckedValue: false,
          },
          defaultValue: false,
          width: '200px',
          field: 'mode',
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
      field: 'drawer',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Drawer',
      label: '抽屉',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '加载服务端逻辑',
        slots: {},
        placement: 'right',
        onOkButtonClick__func: `    `,
        onOkButtonClick__params: ['params'],
        onCancelButtonClick__func: `    `,
        onCancelButtonClick__params: ['params'],
        onDialogOpened__func: `    `,
        onDialogOpened__params: ['params'],
        onDialogBeforeClose__func: `    `,
        onDialogBeforeClose__params: ['params'],
        width: 378,
        zIndex: 1000,
        isDetail: false,
        showDetailBack: false,
        maskClosable: true,
        showCancelBtn: true,
        showOkBtn: true,
        showFooter: true,
        maxLength: 100,
      },
      children: [
        {
          component: 'AutoComplete',
          label: '逻辑编码',
          colProps: {
            span: 24,
          },
          field: 'logic',
          componentProps: {
            placeholder: '请输入关键字',
            valueField: 'value',
            labelField: 'label',
            api__func: ` return await axios.get({url:'/api/model/list/'+params.keyword}); `,
            api__params: ['params'],
            defaultContext__var: `  {  
        key_input: '1',  
  }  `,
            params__tpl: '{\n      keyword: ${key_input},\n}',
            resultField: '',
            onSelect__func: ` debugger; `,
            immediate: true,
            maxLength: 100,
            defaultContext: {
              key_input: '1',
            },
            params: {
              keyword: 1,
            },
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
      field: 'drawer_1',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
    },
    {
      component: 'Drawer',
      label: '逻辑库',
      formItem: false,
      type: 'container',
      componentProps: {
        title: '逻辑库',
        slots: {},
        placement: 'right',
        onOkButtonClick__func: `let drawer=this.itemRef("drawer_2");
        let data=await drawer.getFormModel();
        let config=drawer.getExtraData();
        let result=await axios.post({url:"/api/crud/update/base/page",data:{config,...data}});
        if(result.id) drawer.setFormModel("id",result.id)
        createMessage.success("保存成功")
        return true;
        `,
        onOkButtonClick__params: ['params'],
        onCancelButtonClick__func: `  `,
        onCancelButtonClick__params: ['params'],
        onDialogOpened__func: `  `,
        onDialogOpened__params: ['params'],
        onDialogBeforeClose__func: `  `,
        onDialogBeforeClose__params: ['params'],
        width: 378,
        zIndex: 1000,
        isDetail: false,
        showDetailBack: false,
        maskClosable: true,
        showCancelBtn: true,
        showOkBtn: true,
        showFooter: true,
        maxLength: 100,
      },
      children: [
        {
          component: 'Input',
          label: 'id',
          field: 'id',
          colProps: {
            span: 24,
          },
          componentProps: {
            type: 'text',
            defaultValue: '',
            onChange__func: `  `,
            readonly: true,
            disabled: true,
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
          label: '逻辑编码',
          field: 'name',
          colProps: {
            span: 24,
          },
          componentProps: {
            type: 'text',
            defaultValue: '',
            onChange__func: `  `,
            readonly: false,
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
            span: 24,
          },
          componentProps: {
            type: 'text',
            defaultValue: '',
            onChange__func: `  `,
            readonly: false,
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
      field: 'drawer_2',
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
