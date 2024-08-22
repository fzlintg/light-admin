<script lang="tsx">
  import type { DescriptionProps, DescInstance, DescItem } from './typing';
  import type { DescriptionsProps } from 'ant-design-vue/es/descriptions';
  import type { CollapseContainerOptions } from '@c/Container';
  import {
    type CSSProperties,
    type PropType,
    defineComponent,
    computed,
    ref,
    unref,
    toRefs,
  } from 'vue';
  import { get, isBoolean } from 'lodash-es';
  import { Descriptions, Tag } from 'ant-design-vue';
  import { CollapseContainer } from '@c/Container';
  import { useDesign } from '@h/web/useDesign';
  import { isFunction } from '@utils/is';
  import { getSlot } from '@utils/helper/tsxHelper';
  import { useAttrs } from '@vben/hooks';
  import { JsonViewer } from 'vue3-json-viewer';

  const props = {
    useCollapse: { type: Boolean, default: true },
    title: { type: String, default: '' },
    size: {
      type: String,
      validator: (v: string) => ['small', 'default', 'middle', undefined].includes(v),
      default: 'small',
    },
    bordered: { type: Boolean, default: true },
    column: {
      type: [Number, Object],
      default: () => {
        return { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };
      },
    },
    collapseOptions: {
      type: Object as PropType<CollapseContainerOptions>,
      default: null,
    },
    schema: {
      type: Array as PropType<DescItem[]>,
      default: () => [],
    },
    data: { type: Object },
  };

  export default defineComponent({
    name: 'Description',
    props,
    emits: ['register'],
    setup(props, { slots, emit }) {
      const propsRef = ref<Partial<DescriptionProps> | null>(null);

      const { prefixCls } = useDesign('description');
      const attrs = useAttrs();

      // Custom title component: get title
      const getMergeProps = computed(() => {
        return {
          ...props,
          ...(unref(propsRef) as any),
        } as DescriptionProps;
      });

      const getProps = computed(() => {
        const opt = {
          ...unref(getMergeProps),
          title: undefined,
        };
        return opt as DescriptionProps;
      });

      /**
       * @description: Whether to setting title
       */
      const useWrapper = computed(() => !!unref(getMergeProps).title);

      /**
       * @description: Get configuration Collapse
       */
      const getCollapseOptions = computed((): CollapseContainerOptions => {
        return {
          // Cannot be expanded by default
          canExpand: false,
          ...unref(getProps).collapseOptions,
        };
      });

      const getDescriptionsProps = computed(() => {
        return { ...unref(attrs), ...unref(getProps) } as DescriptionsProps;
      });

      /**
       * @description:设置desc
       */
      function setDescProps(descProps: Partial<DescriptionProps>): void {
        // Keep the last setDrawerProps
        propsRef.value = {
          ...(unref(propsRef) as Record<string, any>),
          ...descProps,
        } as Record<string, any>;
      }

      // Prevent line breaks
      function renderLabel({ label, labelMinWidth, labelStyle }: DescItem) {
        if (!labelStyle && !labelMinWidth) {
          return label;
        }

        const labelStyles: CSSProperties = {
          ...labelStyle,
          minWidth: `${labelMinWidth}px `,
        };
        return <div style={labelStyles}>{label}</div>;
      }

      function renderItem() {
        const { schema, data } = unref(getProps);
        return unref(schema)
          .map((item) => {
            const { render, field, span, show, contentMinWidth, formatter } = item;

            if (show && isFunction(show) && !show(data)) {
              return null;
            }

            const getContent = () => {
              const _data = unref(getProps)?.data;
              if (!_data) {
                return null;
              }
              const getField = get(_data, field);
              if (isBoolean(getField))
                return <Tag color="processing">{getField ? '是' : '否'}</Tag>;
              if (formatter) {
                switch (formatter) {
                  case 'json':
                    return (
                      <JsonViewer value={getField} expandDepth={1} copyable boxed sort></JsonViewer>
                    );

                  // case 'dict':
                  //   return <div>{getField?.[item.dictKey]}</div>;
                  //   break;
                  case 'dict':
                    if (Array.isArray(getField))
                      return (
                        <div>
                          {getField?.map((field) => {
                            return <Tag color="success">{field}</Tag>;
                          })}
                        </div>
                      );
                    else return <Tag color="success">{getField}</Tag>;
                }
              }
              // eslint-disable-next-line
              if (getField && !toRefs(_data).hasOwnProperty(field)) {
                return isFunction(render) ? render('', _data) : '';
              }
              return isFunction(render) ? render(getField, _data) : getField ?? '';
            };

            const width = contentMinWidth;
            return (
              <Descriptions.Item label={renderLabel(item)} key={field} span={span}>
                {() => {
                  if (!contentMinWidth) {
                    return getContent();
                  }
                  const style: CSSProperties = {
                    minWidth: `${width}px`,
                  };
                  return <div style={style}>{getContent()}</div>;
                }}
              </Descriptions.Item>
            );
          })
          .filter((item) => !!item);
      }

      const renderDesc = () => {
        return (
          <Descriptions class={`${prefixCls}`} {...(unref(getDescriptionsProps) as any)}>
            {renderItem()}
          </Descriptions>
        );
      };

      const renderContainer = () => {
        const content = props.useCollapse ? renderDesc() : <div>{renderDesc()}</div>;
        // Reduce the dom level
        if (!props.useCollapse) {
          return content;
        }

        const { canExpand, helpMessage } = unref(getCollapseOptions);
        const { title } = unref(getMergeProps);

        return (
          <CollapseContainer title={title} canExpan={canExpand} helpMessage={helpMessage}>
            {{
              default: () => content,
              action: () => getSlot(slots, 'action'),
            }}
          </CollapseContainer>
        );
      };

      const methods: DescInstance = {
        setDescProps,
      };

      emit('register', methods);
      return () => (unref(useWrapper) ? renderContainer() : renderDesc());
    },
  });
</script>
