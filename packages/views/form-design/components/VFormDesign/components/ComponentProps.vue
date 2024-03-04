<!--
 * @Description: 组件属性控件
-->
<template>
  <div class="properties-content mx-2">
    <div class="properties-body" v-if="formConfig.currentItem">
      <Empty class="hint-box" v-if="!formConfig.currentItem.key" description="未选择组件" />
      <Form label-align="left" layout="vertical">
        <!--    循环遍历渲染组件属性      -->

        <div v-if="formConfig.currentItem && formConfig.currentItem.componentProps">
          <FormItem :label="item.label" v-for="item in inputOptions" :key="item.name">
            <!--     处理数组属性，placeholder       -->

            <div v-if="item.children">
              <template v-for="(child, index) of item.children" :key="index">
                <component
                  v-if="child.component"
                  v-bind="child.componentProps"
                  v-model:value="formConfig.currentItem.componentProps[item.name][index]"
                  :is="getComponent(child.component)"
                />
              </template>
            </div>
            <!--     如果不是数组，则正常处理属性值       -->
            <component
              v-else-if="item.component && item.component != 'Divider'"
              class="component-prop"
              v-bind="item.componentProps"
              :is="getComponent(item.component)"
              v-model:value="formConfig.currentItem.componentProps[item.name]"
            />
            <Divider
              class="divider_title"
              dashed
              v-else-if="item.component == 'Divider' && item.componentProps.label"
              >{{ item.componentProps.label }}</Divider
            >
          </FormItem>
          <Divider class="divider_title" dashed>控制属性</Divider>
          <FormItem>
            <Col v-for="item in controlOptions" :key="item.name">
              <Checkbox
                v-if="showControlAttrs(item.includes)"
                v-bind="item.componentProps"
                v-model:checked="formConfig.currentItem.componentProps[item.name]"
              >
                {{ item.label }}
              </Checkbox>
            </Col>
          </FormItem>
        </div>
        <FormItem label="关联字段">
          <Select
            mode="multiple"
            v-model:value="formConfig.currentItem['link']"
            :options="linkOptions"
          />
        </FormItem>

        <FormItem
          label="选项"
          v-if="
            [
              'Select',
              'CheckboxGroup',
              'RadioGroup',
              'TreeSelect',
              'Cascader',
              'AutoComplete',
            ].includes(formConfig.currentItem.component)
          "
        >
          <FormOptions />
        </FormItem>

        <FormItem label="栅格" v-if="['Grid'].includes(formConfig.currentItem.component)">
          <FormOptions />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script lang="ts">
  import {
    Empty,
    Input,
    Form,
    FormItem,
    Switch,
    Checkbox,
    Select,
    InputNumber,
    RadioGroup,
    Col,
    Row,
    Divider,
  } from 'ant-design-vue';
  import RadioButtonGroup from '@c/Form/src/components/RadioButtonGroup.vue';
  import { computed, defineComponent, ref, watch } from 'vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import {
    baseComponentControlAttrs,
    baseComponentAttrs,
    baseComponentCommonAttrs,
    componentPropsFuncs,
  } from '../../VFormDesign/config/componentPropsConfig';
  import FormOptions from './FormOptions.vue';
  import { formItemsForEach, remove } from '../../../utils';
  import { IBaseFormAttrs } from '../config/formItemPropsConfig';
  //import customConfig from '../config/custom/index';
  import {
    schema as customSchema,
    setting as customSetting,
    func as customFuncs,
  } from '../../../extention/loader';
  import defaultSetting, { getSetting } from '../../../extention/defaultSetting';
  import { componentMap } from '../../../core/formItemConfig';
  //import { endsWith } from 'lodash-es';
  //console.log(...componentMap);
  export default defineComponent({
    name: 'ComponentProps',
    components: {
      FormOptions,
      Empty,
      Input,
      Form,
      FormItem,
      Switch,
      Checkbox,
      Select,
      InputNumber,
      RadioGroup,
      RadioButtonGroup,
      Col,
      Row,
      Divider,
      //Code: componentMap['Code'],
    },
    setup() {
      // 让computed属性自动更新

      const allOptions = ref([] as Omit<IBaseFormAttrs, 'tag'>[]);
      const showControlAttrs = (includes: string[] | undefined) => {
        if (!includes) return true;
        return includes.includes(formConfig.value.currentItem!.component);
      };

      const { formConfig } = useFormDesignState();

      if (formConfig.value.currentItem) {
        formConfig.value.currentItem.componentProps =
          formConfig.value.currentItem.componentProps || {};
      }
      //add by lintg
      const getComponent = (name) => {
        return componentMap.get(name) || name;
      };

      for (const item in customFuncs) {
        componentPropsFuncs[item] = customFuncs[item];
      }
      //生成配置
      for (let schema of customSchema) {
        customSetting[schema.component] = customSetting[schema.component] || [];
        for (const propItem in schema.componentProps) {
          if (customSetting[schema.component].filter((i) => i.name == propItem).length == 0) {
            if (defaultSetting[propItem])
              customSetting[schema.component].push({ name: propItem, ...defaultSetting[propItem] });
            else {
              let setting = getSetting(propItem, schema.componentProps);
              setting && customSetting[schema.component].push({ name: propItem, ...setting });
            }
          }
        }
      }
      //自动修正配置分类
      for (const item in customSetting) {
        for (let comp of customSetting[item]) {
          if (!comp.sortTitle) {
            if (comp.name?.endsWith('Field')) comp.sortTitle = '字段设置';
            else if (comp.name?.endsWith('__func')) comp.sortTitle = '函数';
          }
        }
      }
      watch(
        () => formConfig.value.currentItem?.field,
        (_newValue, oldValue) => {
          formConfig.value.schemas &&
            formItemsForEach(formConfig.value.schemas, (item) => {
              if (item.link) {
                const index = item.link.findIndex((linkItem) => linkItem === oldValue);
                index !== -1 && remove(item.link, index);
              }
            });
        },
      );

      watch(
        () => formConfig.value.currentItem && formConfig.value.currentItem.component,
        () => {
          allOptions.value = [];
          baseComponentControlAttrs.forEach((item) => {
            item.category = 'control';
            if (!item.includes) {
              // 如果属性没有include，所有的控件都适用

              allOptions.value.push(item);
            } else if (item.includes.includes(formConfig.value.currentItem!.component)) {
              // 如果有include，检查是否包含了当前控件类型
              allOptions.value.push(item);
            }
          });

          baseComponentCommonAttrs.forEach((item) => {
            item.category = 'input';
            if (item.includes) {
              if (item.includes.includes(formConfig.value.currentItem!.component)) {
                allOptions.value.push(item);
              }
            } else if (item.exclude) {
              if (!item.exclude.includes(formConfig.value.currentItem!.component)) {
                allOptions.value.push(item);
              }
            } else {
              allOptions.value.push(item);
            }
          });

          baseComponentAttrs[formConfig.value.currentItem!.component] &&
            baseComponentAttrs[formConfig.value.currentItem!.component].forEach(async (item) => {
              if (item.component) {
                if (['Switch', 'Checkbox', 'Radio'].includes(item.component as string)) {
                  item.category = 'control';
                  allOptions.value.push(item);
                } else {
                  item.category = 'input';
                  allOptions.value.push(item);
                }
              }
            });
          //add by lintg

          if (customSetting[formConfig.value.currentItem!.component]?.length > 0) {
            allOptions.value.push(
              ...customSetting[formConfig.value.currentItem!.component].map((item) => ({
                category: 'input',
                ...item,
              })),
            );
          }
        },
        {
          immediate: true,
        },
      );
      // 控制性的选项
      const controlOptions = computed(() => {
        return allOptions.value.filter((item) => {
          return item.category == 'control';
        });
      });

      // 非控制性选择
      const inputOptions = computed(() => {
        let result = allOptions.value
          .filter((item) => {
            return item.category == 'input' && !item?.hidden;
          })
          .sort(function (a, b) {
            return a.sortTitle > b.sortTitle ? -1 : a.sortTitle < b.sortTitle ? 1 : 0;
          }); //lintg  添加了hidden)
        let title = '';
        for (let i = 0; i < result.length; i++) {
          if (title != result[i].sortTitle) {
            title = result[i].sortTitle;
            // console.log(title);
            result.splice(i, 0, {
              component: 'Divider',
              componentProps: {
                label: title || '通用属性',
              },
              colProps: {
                span: 24,
              },
            });
            i++;
          }
        }
        // console.log(result);
        //  debugger;
        return result;
      });

      watch(
        () => formConfig.value.currentItem!.componentProps,
        () => {
          const func = componentPropsFuncs[formConfig.value.currentItem!.component];
          if (func) {
            func(formConfig.value.currentItem!.componentProps, allOptions.value);
          }
        },
        {
          immediate: true,
          deep: true,
        },
      );
      const linkOptions = computed(() => {
        return (
          formConfig.value.schemas &&
          formConfig.value.schemas
            .filter((item) => item.key !== formConfig.value.currentItem!.key)
            .map(({ label, field }) => ({ label: label + '/' + field, value: field }))
        );
      });
      return {
        formConfig,
        showControlAttrs,
        linkOptions,
        controlOptions,
        inputOptions,
        allOptions,
        getComponent,
      };
    },
  });
</script>
<style scoped>
  .divider_title {
    border-color: #f00;
    font-weight: bold;
  }
</style>
