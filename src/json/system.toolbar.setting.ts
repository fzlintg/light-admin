export default {
  layout: 'horizontal',
  schemas: [
    {
      type: 'container',
      _type: 'custom',
      field: 'drawer',
      label: '设置',
      width: '200px',
      children: [
        {
          field: 'mode',
          label: '模式开关',
          width: '200px',
          colProps: {
            span: 24,
          },
          component: 'Switch',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
          defaultValue: false,
          componentProps: {
            checkedValue: true,
            unCheckedValue: false,
            checkedChildren: '服务',
            unCheckedChildren: '本地',
          },
        },
      ],
      colProps: {
        span: 24,
      },
      formItem: false,
      component: 'Drawer',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
      componentProps: {
        slots: {},
        title: '设置',
        width: 378,
        zIndex: 1000,
        isDetail: false,
        placement: 'right',
        showOkBtn: true,
        showFooter: true,
        maskClosable: true,
        showCancelBtn: true,
        showDetailBack: false,
        onDialogOpened__func: `            `,
        onOkButtonClick__func: `    let data=await this.itemRef("drawer").getFormModel();    
            appStore.setLightFormConfig(data)    
            createMessage.success('保存成功');    
            return true;    
          `,
        onDialogOpened__params: ['params'],
        onOkButtonClick__params: ['params'],
        onCancelButtonClick__func: `            `,
        onDialogBeforeClose__func: `            `,
        onCancelButtonClick__params: ['params'],
        onDialogBeforeClose__params: ['params'],
      },
    },
    {
      type: 'container',
      _type: 'custom',
      field: 'drawer_1',
      label: '抽屉',
      width: '200px',
      children: [
        {
          _type: 'custom',
          field: 'name',
          label: '逻辑编码',
          width: '200px',
          colProps: {
            span: 24,
          },
          component: 'AutoComplete',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
          componentProps: {
            params: {
              keyword: '',
            },
            api__func: `   if(!!params.keyword) return await axios.post({url:'/api/logic/getPageList/'+params.keyword});   `,
            immediate: true,
            maxLength: 100,
            labelField: 'label',
            valueField: 'value',
            api__params: ['params'],
            params__tpl: '{\n      keyword: "${key_input}",\n}',
            placeholder: '请输入关键字',
            resultField: '',
            defaultContext: {
              key_input: '',
            },
            onSelect__func: `     `,
            tplRender__func: `  return h('div',{class:'d-flex jc-between'}, 
             [h('span',data.value),h('span',data.label)] 
           ) 
              `,
            tplRender__params: ['{h,r}', 'data'],
            defaultContext__var: `    {    
          key_input: '',    
    }    `,
          },
        },
      ],
      colProps: {
        span: 24,
      },
      formItem: false,
      component: 'Drawer',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
      componentProps: {
        slots: {},
        title: '加载服务端逻辑',
        width: 378,
        zIndex: 1000,
        isDetail: false,
        maxLength: 100,
        placement: 'right',
        showOkBtn: true,
        showFooter: true,
        maskClosable: true,
        showCancelBtn: true,
        showDetailBack: false,
        onDialogOpened__func: `        `,
        onOkButtonClick__func: ` 
         let drawer=this.itemRef("drawer_1") 
         let formModel=await drawer.getFormModel();    
         if(location.href.split("#")[1].indexOf("/formDesign")==0){
           let extraData= drawer.getExtraData(); 
           let result=await axios.post({url:"/api/crud/query/base/page",data:{where:{name:formModel.name}}}); 
            if(result.items&&result.items.length>0) { 
              this.context.emit("loadSchemas",result.items[0].config); 
              Object.assign(extraData,_.pick(result.items[0],['id','name','title']));
            } 
         }
            else
            {
                let path=utils.setUrlParam("name",formModel.name,false).split("#")[1];
                utils.updatePath(path);
            }
        utils.setUrlParam("name",formModel.name);
        return true; 
          `,
        onDialogOpened__params: ['params'],
        onOkButtonClick__params: ['{_this,callback,utils}'],
        onCancelButtonClick__func: `        `,
        onDialogBeforeClose__func: `        `,
        onCancelButtonClick__params: ['params'],
        onDialogBeforeClose__params: ['params'],
      },
    },
    {
      type: 'container',
      _type: 'custom',
      field: 'drawer_2',
      label: '逻辑库',
      width: '200px',
      children: [
        {
          _type: 'custom',
          field: 'id',
          label: 'id',
          width: '200px',
          colProps: {
            span: 24,
          },
          component: 'Input',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
          componentProps: {
            type: 'text',
            disabled: true,
            readonly: true,
            defaultValue: '',
            onChange__func: `      `,
          },
        },
        {
          _type: 'custom',
          field: 'name',
          label: '逻辑编码',
          width: '200px',
          colProps: {
            span: 24,
          },
          component: 'Input',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
          componentProps: {
            type: 'text',
            readonly: false,
            defaultValue: '',
            onChange__func: `      `,
          },
        },
        {
          _type: 'custom',
          field: 'title',
          label: '名称',
          width: '200px',
          colProps: {
            span: 24,
          },
          component: 'Input',
          itemProps: {
            labelCol: {},
            wrapperCol: {},
          },
          componentProps: {
            type: 'text',
            readonly: false,
            defaultValue: '',
            onChange__func: `      `,
          },
        },
      ],
      colProps: {
        span: 24,
      },
      formItem: false,
      component: 'Drawer',
      itemProps: {
        labelCol: {},
        wrapperCol: {},
      },
      componentProps: {
        slots: {},
        title: '逻辑库',
        width: 378,
        zIndex: 1000,
        isDetail: false,
        maxLength: 100,
        placement: 'right',
        showOkBtn: true,
        showFooter: true,
        maskClosable: true,
        showCancelBtn: true,
        showDetailBack: false,
        onDialogOpened__func: `      `,
        onOkButtonClick__func: `  let drawer=this.itemRef("drawer_2");  
          let data=await drawer.getFormModel();  
          let config=drawer.getExtraData();  
          let result=await axios.post({url:"/api/crud/update/base/page",data:{config,...data}});  
          if(result.id) drawer.setFormModel("id",result.id)  
          createMessage.success("保存成功")  
          return true;  
            `,
        onDialogOpened__params: ['params'],
        onOkButtonClick__params: ['params'],
        onCancelButtonClick__func: `      `,
        onDialogBeforeClose__func: `      `,
        onCancelButtonClick__params: ['params'],
        onDialogBeforeClose__params: ['params'],
      },
    },
  ],
  labelCol: {},
  labelWidth: 100,
  wrapperCol: {},
  labelLayout: 'flex',
};
