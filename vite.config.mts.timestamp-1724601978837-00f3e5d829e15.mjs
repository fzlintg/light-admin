// vite.config.mts
import { defineApplicationConfig } from "file:///D:/js/work/admin/light-admin/internal/vite-config/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///D:/js/work/admin/light-admin/node_modules/.pnpm/unplugin-auto-import@0.17.8_@vueuse+core@10.11.1_vue@3.4.38_typescript@5.5.4___rollup@3.29.4/node_modules/unplugin-auto-import/dist/vite.js";
import VueSetupExtend from "file:///D:/js/work/admin/light-admin/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@5.4.1_@types+node@22.4.0_less@4.2.0_terser@5.26.0_/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\js\\work\\admin\\light-admin";
var vite_config_default = defineApplicationConfig({
  overrides: {
    plugins: [
      //    getI18n(),
      VueSetupExtend(),
      // styleImport({
      //   resolves: [AndDesignVueResolve()],
      // }),
      AutoImport({
        imports: ["vue", "vue-router"],
        // 自动导入vue和vue-router相关函数
        eslintrc: {
          enabled: true,
          // Default `false`
          filepath: "./.eslintrc-auto-import.json",
          // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true
          // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: "types/auto-import.d.ts"
        // 生成 `auto-import.d.ts` 全局声明
      })
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
        "echarts/core",
        "echarts/charts",
        "echarts/components",
        "echarts/renderers",
        "qrcode",
        "@iconify/iconify",
        "ant-design-vue/es/locale/zh_CN",
        "ant-design-vue/es/locale/en_US"
      ]
    },
    server: {
      proxy: {
        "/basic-api/api": {
          target: "http://localhost:7001",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api/api`), "")
        },
        "/basic-api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), "")
        },
        "/upload": {
          target: "http://localhost:3300/upload",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), "")
        }
      },
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    },
    resolve: {
      alias: {
        "@c": resolve(__vite_injected_original_dirname, "packages/components"),
        // 路径别名
        "@h": resolve(__vite_injected_original_dirname, "packages/myhooks"),
        // 路径别名
        "@utils": resolve(__vite_injected_original_dirname, "packages/utils"),
        // 路径别名
        "@hooks": resolve(__vite_injected_original_dirname, "packages/hooks"),
        // 路径别名
        "@layouts": resolve(__vite_injected_original_dirname, "packages/layouts"),
        // 路径别名
        "@directives": resolve(__vite_injected_original_dirname, "packages/directives"),
        // 路径别名
        "@logics": resolve(__vite_injected_original_dirname, "packages/logics"),
        // 路径别名
        "@design": resolve(__vite_injected_original_dirname, "packages/design"),
        // 路径别名
        "@enums": resolve(__vite_injected_original_dirname, "packages/enums"),
        // 路径别名
        "@locales": resolve(__vite_injected_original_dirname, "packages/locales"),
        // 路径别名
        "@settings": resolve(__vite_injected_original_dirname, "packages/settings"),
        // 路径别名
        "@store": resolve(__vite_injected_original_dirname, "packages/store"),
        // 路径别名
        "@router": resolve(__vite_injected_original_dirname, "packages/router"),
        // 路径别名
        "@views": resolve(__vite_injected_original_dirname, "packages/views")
        // 路径别名
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcanNcXFxcd29ya1xcXFxhZG1pblxcXFxsaWdodC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcanNcXFxcd29ya1xcXFxhZG1pblxcXFxsaWdodC1hZG1pblxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2pzL3dvcmsvYWRtaW4vbGlnaHQtYWRtaW4vdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQXBwbGljYXRpb25Db25maWcgfSBmcm9tICdAdmJlbi92aXRlLWNvbmZpZyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuLy9pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG4vLyBpbXBvcnQgc3R5bGVJbXBvcnQsIHsgQW5kRGVzaWduVnVlUmVzb2x2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCc7XG4vL2ltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnO1xuLy8gaW1wb3J0IHsgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4sIEFuZERlc2lnblZ1ZVJlc29sdmUgfSBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnQnO1xuLy8gaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJztcbi8vIGltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJztcbi8vaW1wb3J0IHsgZ2V0STE4biB9IGZyb20gJy4vcGFja2FnZXMvbG9jYWxlcy9zZXR1cEkxOG4nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVBcHBsaWNhdGlvbkNvbmZpZyh7XG4gIG92ZXJyaWRlczoge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIC8vICAgIGdldEkxOG4oKSxcbiAgICAgIFZ1ZVNldHVwRXh0ZW5kKCksXG5cbiAgICAgIC8vIHN0eWxlSW1wb3J0KHtcbiAgICAgIC8vICAgcmVzb2x2ZXM6IFtBbmREZXNpZ25WdWVSZXNvbHZlKCldLFxuICAgICAgLy8gfSksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlciddLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjV2dWVcdTU0OEN2dWUtcm91dGVyXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgLy8gRGVmYXVsdCBgZmFsc2VgXG4gICAgICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJywgLy8gRGVmYXVsdCBgLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbmBcbiAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBEZWZhdWx0IGB0cnVlYCwgKHRydWUgfCBmYWxzZSB8ICdyZWFkb25seScgfCAncmVhZGFibGUnIHwgJ3dyaXRhYmxlJyB8ICd3cml0ZWFibGUnKVxuICAgICAgICB9LFxuICAgICAgICBkdHM6ICd0eXBlcy9hdXRvLWltcG9ydC5kLnRzJywgLy8gXHU3NTFGXHU2MjEwIGBhdXRvLWltcG9ydC5kLnRzYCBcdTUxNjhcdTVDNDBcdTU4RjBcdTY2MEVcbiAgICAgIH0pLFxuXG4gICAgICAvLyBQYWdlcyh7XG4gICAgICAvLyAgIC8vIFx1OTcwMFx1ODk4MVx1NzUxRlx1NjIxMFx1OERFRlx1NzUzMVx1NzY4NFx1NjU4N1x1NEVGNlx1NzZFRVx1NUY1NVx1RkYwQ1x1OUVEOFx1OEJBNFx1NUMzMVx1NjYyRlx1OEJDNlx1NTIyQnNyY1x1NEUwQlx1OTc2Mlx1NzY4NHBhZ2VzXHU2NTg3XHU0RUY2XG4gICAgICAvLyAgIHBhZ2VzRGlyOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpICsgJy9wYWdlcycsXG4gICAgICAvLyAgIC8vZGlyczogXCJzcmMvcGFnZXNcIixcblxuICAgICAgLy8gICAvLyBcdTYzOTJcdTk2NjRcdTU3MjhcdTU5MTZcdTc2ODRcdTc2RUVcdTVGNTVcdUZGMENcdTUzNzNcdTRFMERcdTVDMDZcdTYyNDBcdTY3MDkgY29tcG9uZW50cyBcdTc2RUVcdTVGNTVcdTRFMEJcdTc2ODQgLnZ1ZSBcdTY1ODdcdTRFRjZcdTc1MUZcdTYyMTBcdThERUZcdTc1MzFcbiAgICAgIC8vICAgZXhjbHVkZTogWycqKi9jb21wb25lbnRzLyoudnVlJ10sXG4gICAgICAvLyB9KSxcbiAgICAgIC8vIExheW91dHMoe1xuICAgICAgLy8gICBsYXlvdXRzRGlyczogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSArICcvbGF5b3V0cycsXG4gICAgICAvLyB9KSxcbiAgICBdLFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogW1xuICAgICAgICAnZWNoYXJ0cy9jb3JlJyxcbiAgICAgICAgJ2VjaGFydHMvY2hhcnRzJyxcbiAgICAgICAgJ2VjaGFydHMvY29tcG9uZW50cycsXG4gICAgICAgICdlY2hhcnRzL3JlbmRlcmVycycsXG4gICAgICAgICdxcmNvZGUnLFxuICAgICAgICAnQGljb25pZnkvaWNvbmlmeScsXG4gICAgICAgICdhbnQtZGVzaWduLXZ1ZS9lcy9sb2NhbGUvemhfQ04nLFxuICAgICAgICAnYW50LWRlc2lnbi12dWUvZXMvbG9jYWxlL2VuX1VTJyxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvYmFzaWMtYXBpL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjcwMDEnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vYmFzaWMtYXBpL2FwaWApLCAnJyksXG4gICAgICAgIH0sXG4gICAgICAgICcvYmFzaWMtYXBpJzoge1xuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXi9iYXNpYy1hcGlgKSwgJycpLFxuICAgICAgICB9LFxuXG4gICAgICAgICcvdXBsb2FkJzoge1xuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzMwMC91cGxvYWQnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vdXBsb2FkYCksICcnKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB3YXJtdXA6IHtcbiAgICAgICAgY2xpZW50RmlsZXM6IFsnLi9pbmRleC5odG1sJywgJy4vc3JjL3t2aWV3cyxjb21wb25lbnRzfS8qJ10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0BjJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9jb21wb25lbnRzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGgnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL215aG9va3MnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAdXRpbHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL3V0aWxzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGhvb2tzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9ob29rcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BsYXlvdXRzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9sYXlvdXRzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGRpcmVjdGl2ZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2RpcmVjdGl2ZXMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAbG9naWNzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9sb2dpY3MnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAZGVzaWduJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9kZXNpZ24nKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAZW51bXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2VudW1zJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGxvY2FsZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2xvY2FsZXMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAc2V0dGluZ3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL3NldHRpbmdzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQHN0b3JlJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9zdG9yZScpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0Byb3V0ZXInOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL3JvdXRlcicpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0B2aWV3cyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvdmlld3MnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1IsU0FBUywrQkFBK0I7QUFDMVQsU0FBUyxlQUFlO0FBRXhCLE9BQU8sZ0JBQWdCO0FBSXZCLE9BQU8sb0JBQW9CO0FBUDNCLElBQU0sbUNBQW1DO0FBYXpDLElBQU8sc0JBQVEsd0JBQXdCO0FBQUEsRUFDckMsV0FBVztBQUFBLElBQ1QsU0FBUztBQUFBO0FBQUEsTUFFUCxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLZixXQUFXO0FBQUEsUUFDVCxTQUFTLENBQUMsT0FBTyxZQUFZO0FBQUE7QUFBQSxRQUM3QixVQUFVO0FBQUEsVUFDUixTQUFTO0FBQUE7QUFBQSxVQUNULFVBQVU7QUFBQTtBQUFBLFVBQ1Ysa0JBQWtCO0FBQUE7QUFBQSxRQUNwQjtBQUFBLFFBQ0EsS0FBSztBQUFBO0FBQUEsTUFDUCxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQWFIO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsa0JBQWtCO0FBQUEsVUFDaEIsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBLFVBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxpQkFBaUIsR0FBRyxFQUFFO0FBQUEsUUFDbkU7QUFBQSxRQUNBLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLElBQUk7QUFBQSxVQUNKLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLE9BQU8sYUFBYSxHQUFHLEVBQUU7QUFBQSxRQUMvRDtBQUFBLFFBRUEsV0FBVztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBLFVBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxVQUFVLEdBQUcsRUFBRTtBQUFBLFFBQzVEO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sYUFBYSxDQUFDLGdCQUFnQiw0QkFBNEI7QUFBQSxNQUM1RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLE1BQU0sUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQTtBQUFBLFFBQzlDLE1BQU0sUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQTtBQUFBLFFBQzNDLFVBQVUsUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQTtBQUFBLFFBQzdDLFVBQVUsUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQTtBQUFBLFFBQzdDLFlBQVksUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQTtBQUFBLFFBQ2pELGVBQWUsUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQTtBQUFBLFFBQ3ZELFdBQVcsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQTtBQUFBLFFBQy9DLFdBQVcsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQTtBQUFBLFFBQy9DLFVBQVUsUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQTtBQUFBLFFBQzdDLFlBQVksUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQTtBQUFBLFFBQ2pELGFBQWEsUUFBUSxrQ0FBVyxtQkFBbUI7QUFBQTtBQUFBLFFBQ25ELFVBQVUsUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQTtBQUFBLFFBQzdDLFdBQVcsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQTtBQUFBLFFBQy9DLFVBQVUsUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQTtBQUFBLE1BQy9DO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
