<script lang="tsx">
  import { defineComponent, computed, unref, type ExtractPropTypes, PropType } from 'vue';
  import { useDesign } from '@h/web/useDesign';
  import { BasicArrow, BasicTitle } from '@c/Basic';

  const collapseHeaderProps = {
    prefixCls: String,
    title: String,
    show: Boolean,
    canExpand: Boolean,
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: '',
    },
  };

  export type CollapseHeaderProps = ExtractPropTypes<typeof collapseHeaderProps>;

  export default defineComponent({
    name: 'CollapseHeader',
    inheritAttrs: false,
    props: collapseHeaderProps,
    emits: ['expand'],
    setup(props, { slots, attrs, emit }) {
      const { prefixCls } = useDesign('collapse-container');
      const _prefixCls = computed(() => props.prefixCls || unref(prefixCls));
      return () => (
        <div class={[`${unref(_prefixCls)}__header px-1 py-4 text-blue bg-gray-100`, attrs.class]}>
          <BasicTitle helpMessage={props.helpMessage} normal>
            {slots.title?.() || props.title}
          </BasicTitle>

          <div class={`${unref(_prefixCls)}__action`}>
            {slots.action
              ? slots.action({ expand: props.show, onClick: () => emit('expand') })
              : props.canExpand && (
                  <BasicArrow up expand={props.show} onClick={() => emit('expand')} />
                )}
          </div>
        </div>
      );
    },
  });
</script>
