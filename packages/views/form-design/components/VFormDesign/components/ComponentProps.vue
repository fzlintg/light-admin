<!--
 * @Description: 组件属性控件
-->
<template>
  <div class="properties-content mx-2">
    <div class="properties-body" v-if="formConfig.currentItem">
      <Empty class="hint-box" v-if="!formConfig.currentItem.key" description="未选择组件" />
      <template v-else>
        <light-form logic="system.componentEdit" :form-model="{ schema: formConfig.currentItem }" />
        <Form label-align="left" layout="vertical">
          <!--    循环遍历渲染组件属性      -->

          <div v-if="formConfig.currentItem && formConfig.currentItem.componentProps">
            <LightProps
              :schema="inputOptions"
              v-model:props="formConfig.currentItem.componentProps"
            />
            <component
              v-if="ifCustSetting"
              :is="settingComp[formConfig.currentItem.component]"
              v-model:props="formConfig.currentItem"
            />
            <Setting
              v-for="item in settingLogics[formConfig.currentItem.component]"
              :logic="item"
              :key="item"
              v-model:props="formConfig.currentItem"
            />

            <Divider class="divider_title" dashed>控制属性</Divider>
            <FormItem>
              <Col v-for="item in controlOptions" :key="item.field">
                <Checkbox
                  v-if="showControlAttrs(item.includes)"
                  v-bind="item.componentProps"
                  v-model:checked="formConfig.currentItem.componentProps[item.field]"
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

          <FormItem label="提交按钮">
            <Checkbox v-model:checked="formConfig.currentItem.showActionButtonGroup" />
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
                'RadioButtonGroup',
              ].includes(formConfig.currentItem.component)
            "
          >
            <FormOptions />
          </FormItem>

          <FormItem
            :label="formConfig.currentItem.component == 'Tabs' ? '标签' : '栅格'"
            v-if="['Grid', 'Tabs', 'GridSubForm'].includes(formConfig.currentItem.component)"
          >
            <FormOptions />
          </FormItem>
        </Form>
      </template>
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
  import { computed, defineComponent, nextTick, ref, watch } from 'vue';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  import {
    baseComponentControlAttrs,
    baseComponentAttrs,
    baseComponentCommonAttrs,
    componentPropsFuncs,
  } from '../../VFormDesign/config/componentPropsConfig';
  import FormOptions from './FormOptions.vue';
  import { findSiblingsByName, formItemsForEach, remove } from '../../../utils';
  import { IBaseFormAttrs } from '../config/formItemPropsConfig';
  //import customConfig from '../config/custom/index';
  import {
    schemas as customSchema,
    // setting as customSetting,
    func as customFuncs,
    settingComp,
    settingExclude,
    settingLogics,
  } from '../../../extention/loader';

  import defaultSetting, {
    getSetting,
    extentionSetting as customSetting, //lintg
  } from '../../../extention/defaultSetting';
  import { formItemMap } from '../../../core/loader';
  import { componentMap } from '../../../core/formItemConfig';
  import ItemOptions from './ItemOptions.vue';
  import { uniqBy } from 'lodash-es';
  import LightProps from './LighProps.vue';

  import Setting from './setting.vue';
  // import ds from '../../../api/index';
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
      ItemOptions,
      LightProps,
      Setting,
      //Code: componentMap['Code'],
    },
    setup() {
      // 让computed属性自动更新
      // const dsOptions = ds.map((item) => {
      //   return {
      //     label: item.label,
      //     value: item.field,
      //   };
      // });
      const ifCustSetting = ref(false);
      const ifLogicSetting = ref(false);

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
      // const getItemProps = (name) => {
      //   return computed({
      //     get() {
      //       return get(formConfig.currentItem.componentProps, name);
      //     },
      //     set(value) {
      //       set(formConfig.currentItem.componentProps, name, value);
      //     },
      //   });
      // };
      // formConfig.currentItem.componentProps[item.field];
      const getComponent = (name) => {
        return componentMap.get(name) || name;
      };

      for (const item in customFuncs) {
        componentPropsFuncs[item] = customFuncs[item];
      }
      //生成配置  lintg

      for (let item in customSchema) {
        for (let schema of customSchema[item].schema) {
          customSetting[schema.component] = customSetting[schema.component] || [];
          for (const propItem in schema.componentProps) {
            if (settingExclude?.[schema.component]?.includes(propItem)) continue; //lintg.2024.7
            if (!customSetting[schema.component].some((i) => i.field == propItem)) {
              if (defaultSetting[propItem])
                //默认值
                customSetting[schema.component].push({
                  field: propItem,
                  ...defaultSetting[propItem],
                });
              else {
                //动态生成
                let setting = getSetting(propItem, schema.componentProps);
                setting && customSetting[schema.component].push({ field: propItem, ...setting });
              }
            }
          }
        }
      }

      //自动修正配置分类 lintg
      for (const item in customSetting) {
        for (let comp of customSetting[item]) {
          if (!comp.sortTitle) {
            if (comp.field?.endsWith('Field')) comp.sortTitle = '字段设置';
            else if (comp.field?.endsWith('__func')) comp.sortTitle = '函数';
            else comp.sortTitle = '通用属性';
          }
        }
      }
      // watch(
      //   () => formConfig.value.currentItem?.field,
      //   (_newValue, oldValue) => {
      //     formConfig.value.schemas &&
      //       formItemsForEach(formConfig.value.schemas, (item) => {
      //         if (item.link) {
      //           const index = item.link.findIndex((linkItem) => linkItem === oldValue);
      //           index !== -1 && remove(item.link, index);
      //         }
      //       });
      //   },
      // );

      watch(
        () => formConfig.value.currentItem && formConfig.value.currentItem.component,
        () => {
          ifCustSetting.value = false;
          ifLogicSetting.value = false;
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
            item.defaultValue =
              item.defaultValue ||
              formItemMap?.[item.component]?.defaultValue ||
              formItemMap?.[item.component]?.componentProps?.defaultValue; //lintg
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
              item.defaultValue =
                item.defaultValue || formItemMap[item.component as string]?.defaultValue;
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
          allOptions.value = uniqBy(allOptions.value, 'field');
          nextTick(() => {
            ifLogicSetting.value = !!settingLogics?.[formConfig.value.currentItem.component];
            ifCustSetting.value = !!settingComp[formConfig.value.currentItem.component];
            //   console.log(ifLogicSetting.value, ifCustSetting.value);
          });
        },
        {
          immediate: true,
        },
      );
      // 控制性的选项
      const controlOptions = computed(() => {
        return toRaw(allOptions.value).filter((item) => item.category == 'control');
      });

      // 非控制性选择
      const inputOptions = computed(() => {
        let result = toRaw(allOptions.value)
          .filter((item) => {
            return item.category == 'input' && !item?.hidden;
          })
          .map((item) => {
            return { sortTitle: '通用属性', ...item };
          })
          .sort(function (a, b) {
            if (a.sortTitle > b.sortTitle) return 1;
            if (a.sortTitle < b.sortTitle) return -1;
            return 0;
          }); //lintg  添加了hidden)

        let title = '';
        for (let i = 0; i < result.length; i++) {
          if (title != result[i].sortTitle) {
            title = result[i].sortTitle!;
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
        return findSiblingsByName(formConfig.value.schemas, formConfig.value.currentItem!.key);
      });
      const showSchema = () => {};
      return {
        showSchema,
        formConfig,
        showControlAttrs,
        linkOptions,
        controlOptions,
        inputOptions,
        allOptions,
        getComponent,
        //   dsOptions,
        settingComp,
        ifCustSetting,
        settingLogics,
        //   getItemProps
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
