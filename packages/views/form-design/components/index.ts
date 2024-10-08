import { defineAsyncComponent, type Component } from 'vue';
import { ComponentType } from '@c/Form/src/types';
import { IconPicker } from '@c/Icon';
//import { CollapseContainer } from '@c/Container/index.ts';
/**
 * Component list, register here to setting it in the form
 */
import {
  Input,
  //Button,
  Select,
  Radio,
  Checkbox,
  //AutoComplete,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TimePicker,
  //ColorPicker,
  TreeSelect,
  Slider,
  Rate,
  Divider,
  Calendar,
  Transfer,
} from 'ant-design-vue';

//import { Button } from '@c/Button';
import { comp as customComponents } from '../extention/loader';
//import LightForm from '@c/LightForm/index.vue';
//ant-desing本身的Form控件库

const componentMap = new Map<string, Component>();
//自定义组件 lintg
for (const compName in customComponents) {
  componentMap.set(compName, customComponents[compName]);
}
componentMap.set(
  'LightForm',
  // LightForm,
  defineAsyncComponent(() => import('@c/LightForm/index.vue')),
);
componentMap.set(
  'MarkDown',
  defineAsyncComponent(() => import('@c/Markdown/src/Markdown.vue')),
);

componentMap.set(
  'QrCode',
  defineAsyncComponent(() => import('@c/Qrcode/src/Qrcode.vue')),
);
componentMap.set('Radio', Radio);
componentMap.set(
  'Button',
  defineAsyncComponent(() => import('@c/Button/src/BasicButton.vue')),
);
componentMap.set(
  'Tinymce',
  defineAsyncComponent(() => import('@c/Tinymce/src/Editor.vue')),
);
componentMap.set('Calendar', Calendar);
componentMap.set('Input', Input);
componentMap.set('InputGroup', Input.Group);
componentMap.set('InputPassword', Input.Password);
componentMap.set('InputSearch', Input.Search);
componentMap.set('InputTextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
//componentMap.set('AutoComplete', AutoComplete);

componentMap.set('Select', Select);
componentMap.set('TreeSelect', TreeSelect);
componentMap.set('Switch', Switch);
componentMap.set('RadioGroup', Radio.Group);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', Checkbox.Group);
componentMap.set('Cascader', Cascader);
componentMap.set('Slider', Slider);
componentMap.set('Rate', Rate);
componentMap.set('Transfer', Transfer);
componentMap.set('DatePicker', DatePicker);
componentMap.set('MonthPicker', DatePicker.MonthPicker);
componentMap.set('RangePicker', DatePicker.RangePicker);
componentMap.set('WeekPicker', DatePicker.WeekPicker);
componentMap.set('TimePicker', TimePicker);
componentMap.set('IconPicker', IconPicker);

componentMap.set('Divider', Divider);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
