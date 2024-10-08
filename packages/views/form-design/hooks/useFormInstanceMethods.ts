import { IAnyObject } from '../typings/base-type';
import { Ref, SetupContext, getCurrentInstance, toRaw, type EmitsOptions } from 'vue';
import { cloneDeep, forOwn, isFunction, set, get } from 'lodash-es';
import { AForm, IVFormComponent } from '../typings/v-form-component';
import { Form } from 'ant-design-vue';
import { formItemsForEach, formModelToData, isAsyncFunction, setContext } from '../utils';

export function useFormInstanceMethods<E extends EmitsOptions = EmitsOptions>(
  props: IAnyObject,
  formdata,
  context: SetupContext<E>,
  _formInstance: Ref<AForm | null>,
  formItemRefList: any, //lintg
) {
  /**
   * 绑定props和on中的上下文为parent
   */
  const bindContext = () => {
    const instance = getCurrentInstance();
    const vm = instance?.proxy;
    if (!vm) return;

    formItemsForEach(props.formConfig.schemas as IVFormComponent[], (item) => {
      setContext(item.componentProps, item.field, vm);
      if (['Toolbar', 'Dropdown', 'ButtonGroup'].includes(item.component)) {
        item.children?.forEach((child) => {
          setContext(child, item.field, vm);
        });
      }
      if (['Modal', 'Drawer'].includes(item.component)) return false;
      else return true;
    });

    // (props.formConfig.schemas as IVFormComponent[]).forEach((item) => {
    //   // 绑定 props 中的上下文  lintg
    //   // forOwn(item.componentProps, (value: any, key) => {
    //   //   if (isFunction(value)) {
    //   //     // const context = formItemRefList[item.field] || vm; //lintg
    //   //     item.componentProps![key] = value.bind(vm);
    //   //   }
    //   // });
    //   // 绑定事件监听（v-on）的上下文
    //   forOwn(item.on, (value: any, key) => {
    //     //  debugger;
    //     if (isFunction(value)) {
    //       item.componentProps![key] = value.bind(vm);
    //     }
    //   });
    // });
  };
  bindContext();

  const { emit } = context;

  const useForm = Form.useForm;

  const { resetFields, validate, clearValidate, validateField } = useForm(formdata, []);

  const submit = async () => {
    const _result = await validate();
    // console.log(_result);
    const data = cloneDeep(toRaw(formdata.value));
    const value = formModelToData(data);
    // const value = {}; //lintg

    // for (const item in data) {
    //   set(value, item, data[item]);
    // }

    emit?.('submit', value);
    props.formConfig.submit?.(value);
    return value;
  };

  return {
    validate,
    validateField,
    resetFields,
    clearValidate,
    submit,
  };
}
