import { defineApplicationConfig } from '@vben/vite-config';
import { resolve } from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
// import Pages from 'vite-plugin-pages';
// import Layouts from 'vite-plugin-vue-layouts';

export default defineApplicationConfig({
  overrides: {
    plugins: [
      VueSetupExtend(),
      AutoImport({
        imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: 'types/auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
      }),
      // Pages({
      //   // 需要生成路由的文件目录，默认就是识别src下面的pages文件
      //   pagesDir: resolve(__dirname, 'src') + '/pages',
      //   //dirs: "src/pages",

      //   // 排除在外的目录，即不将所有 components 目录下的 .vue 文件生成路由
      //   exclude: ['**/components/*.vue'],
      // }),
      // Layouts({
      //   layoutsDirs: resolve(__dirname, 'src') + '/layouts',
      // }),
    ],
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      proxy: {
        '/basic-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:3300/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    resolve: {
      alias: {
        '@c': resolve(__dirname, 'packages/components'), // 路径别名
        '@h': resolve(__dirname, 'packages/myhooks'), // 路径别名
        '@utils': resolve(__dirname, 'packages/utils'), // 路径别名
        '@layouts': resolve(__dirname, 'packages/layouts'), // 路径别名
        '@directives': resolve(__dirname, 'packages/directives'), // 路径别名
        '@logics': resolve(__dirname, 'packages/logics'), // 路径别名
        '@design': resolve(__dirname, 'packages/design'), // 路径别名
        '@enums': resolve(__dirname, 'packages/enums'), // 路径别名
        '@locales': resolve(__dirname, 'packages/locales'), // 路径别名
        '@settings': resolve(__dirname, 'packages/settings'), // 路径别名
        '@store': resolve(__dirname, 'packages/store'), // 路径别名
        '@router': resolve(__dirname, 'packages/router'), // 路径别名
        '@views': resolve(__dirname, 'packages/views'), // 路径别名
      },
    },
  },
});
