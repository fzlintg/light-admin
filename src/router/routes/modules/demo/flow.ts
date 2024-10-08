import type { AppRouteModule } from '@router/types';

import { LAYOUT } from '@router/constant';
import { t } from '@h/web/useI18n';

const charts: AppRouteModule = {
  path: '/flow',
  name: 'FlowDemo',
  component: LAYOUT,
  redirect: '/flow/flowChart',
  meta: {
    orderNo: 5000,
    icon: 'tabler:chart-dots',
    title: t('routes.demo.flow.name'),
  },
  children: [
    {
      path: 'flowChart',
      name: 'flowChartDemo',
      component: () => import('@/views/demo/comp/flow-chart/index.vue'),
      meta: {
        title: t('routes.demo.flow.flowChart'),
      },
    },
    {
      path: 'dbTable',
      name: 'DbTableDemo',
      component: () => import('@/views/demo/db/table.vue'),
      meta: {
        title: '数据库表',
      },
    },
  ],
};

export default charts;
