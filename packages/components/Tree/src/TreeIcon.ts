import type { VNode } from 'vue';
import { h } from 'vue';
import { isString } from 'lodash-es';
import Icon from '@c/Icon/Icon.vue';

export const TreeIcon = ({ icon }: { icon: VNode | string | undefined }) => {
  if (!icon) return null;
  if (isString(icon)) {
    const iconArr = icon.split('$');
    return h(Icon, { icon: iconArr[0], color: iconArr?.[1], class: 'mr-2 ' });
  }
  return h(Icon);
};
