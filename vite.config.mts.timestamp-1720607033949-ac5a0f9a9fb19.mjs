// vite.config.mts
import { defineApplicationConfig } from "file:///E:/JS/work/admin/light-admin/internal/vite-config/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///E:/JS/work/admin/light-admin/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0_vue@3.4.26_typescript@5.4.5___rollup@3.29.4/node_modules/unplugin-auto-import/dist/vite.js";
import VueSetupExtend from "file:///E:/JS/work/admin/light-admin/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@5.2.11_@types+node@20.10.6_less@4.2.0_sass@1.69.7_terser@5.26.0_/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\JS\\work\\admin\\light-admin";
var vite_config_default = defineApplicationConfig({
  overrides: {
    plugins: [
      //getI18n(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcSlNcXFxcd29ya1xcXFxhZG1pblxcXFxsaWdodC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcSlNcXFxcd29ya1xcXFxhZG1pblxcXFxsaWdodC1hZG1pblxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0pTL3dvcmsvYWRtaW4vbGlnaHQtYWRtaW4vdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQXBwbGljYXRpb25Db25maWcgfSBmcm9tICdAdmJlbi92aXRlLWNvbmZpZyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuLy9pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG4vLyBpbXBvcnQgc3R5bGVJbXBvcnQsIHsgQW5kRGVzaWduVnVlUmVzb2x2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCc7XG4vL2ltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnO1xuLy8gaW1wb3J0IHsgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4sIEFuZERlc2lnblZ1ZVJlc29sdmUgfSBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnQnO1xuLy8gaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJztcbi8vIGltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJztcbi8vaW1wb3J0IHsgZ2V0STE4biB9IGZyb20gJy4vcGFja2FnZXMvbG9jYWxlcy9zZXR1cEkxOG4nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVBcHBsaWNhdGlvbkNvbmZpZyh7XG4gIG92ZXJyaWRlczoge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIC8vZ2V0STE4bigpLFxuICAgICAgVnVlU2V0dXBFeHRlbmQoKSxcblxuICAgICAgLy8gc3R5bGVJbXBvcnQoe1xuICAgICAgLy8gICByZXNvbHZlczogW0FuZERlc2lnblZ1ZVJlc29sdmUoKV0sXG4gICAgICAvLyB9KSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NXZ1ZVx1NTQ4Q3Z1ZS1yb3V0ZXJcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcbiAgICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLCAvLyBEZWZhdWx0IGBmYWxzZWBcbiAgICAgICAgICBmaWxlcGF0aDogJy4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb24nLCAvLyBEZWZhdWx0IGAuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uYFxuICAgICAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWUsIC8vIERlZmF1bHQgYHRydWVgLCAodHJ1ZSB8IGZhbHNlIHwgJ3JlYWRvbmx5JyB8ICdyZWFkYWJsZScgfCAnd3JpdGFibGUnIHwgJ3dyaXRlYWJsZScpXG4gICAgICAgIH0sXG4gICAgICAgIGR0czogJ3R5cGVzL2F1dG8taW1wb3J0LmQudHMnLCAvLyBcdTc1MUZcdTYyMTAgYGF1dG8taW1wb3J0LmQudHNgIFx1NTE2OFx1NUM0MFx1NThGMFx1NjYwRVxuICAgICAgfSksXG5cbiAgICAgIC8vIFBhZ2VzKHtcbiAgICAgIC8vICAgLy8gXHU5NzAwXHU4OTgxXHU3NTFGXHU2MjEwXHU4REVGXHU3NTMxXHU3Njg0XHU2NTg3XHU0RUY2XHU3NkVFXHU1RjU1XHVGRjBDXHU5RUQ4XHU4QkE0XHU1QzMxXHU2NjJGXHU4QkM2XHU1MjJCc3JjXHU0RTBCXHU5NzYyXHU3Njg0cGFnZXNcdTY1ODdcdTRFRjZcbiAgICAgIC8vICAgcGFnZXNEaXI6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgKyAnL3BhZ2VzJyxcbiAgICAgIC8vICAgLy9kaXJzOiBcInNyYy9wYWdlc1wiLFxuXG4gICAgICAvLyAgIC8vIFx1NjM5Mlx1OTY2NFx1NTcyOFx1NTkxNlx1NzY4NFx1NzZFRVx1NUY1NVx1RkYwQ1x1NTM3M1x1NEUwRFx1NUMwNlx1NjI0MFx1NjcwOSBjb21wb25lbnRzIFx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCAudnVlIFx1NjU4N1x1NEVGNlx1NzUxRlx1NjIxMFx1OERFRlx1NzUzMVxuICAgICAgLy8gICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKi52dWUnXSxcbiAgICAgIC8vIH0pLFxuICAgICAgLy8gTGF5b3V0cyh7XG4gICAgICAvLyAgIGxheW91dHNEaXJzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpICsgJy9sYXlvdXRzJyxcbiAgICAgIC8vIH0pLFxuICAgIF0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgICdlY2hhcnRzL2NvcmUnLFxuICAgICAgICAnZWNoYXJ0cy9jaGFydHMnLFxuICAgICAgICAnZWNoYXJ0cy9jb21wb25lbnRzJyxcbiAgICAgICAgJ2VjaGFydHMvcmVuZGVyZXJzJyxcbiAgICAgICAgJ3FyY29kZScsXG4gICAgICAgICdAaWNvbmlmeS9pY29uaWZ5JyxcbiAgICAgICAgJ2FudC1kZXNpZ24tdnVlL2VzL2xvY2FsZS96aF9DTicsXG4gICAgICAgICdhbnQtZGVzaWduLXZ1ZS9lcy9sb2NhbGUvZW5fVVMnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9iYXNpYy1hcGkvYXBpJzoge1xuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NzAwMScsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXi9iYXNpYy1hcGkvYXBpYCksICcnKSxcbiAgICAgICAgfSxcbiAgICAgICAgJy9iYXNpYy1hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeL2Jhc2ljLWFwaWApLCAnJyksXG4gICAgICAgIH0sXG5cbiAgICAgICAgJy91cGxvYWQnOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMzAwL3VwbG9hZCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXi91cGxvYWRgKSwgJycpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHdhcm11cDoge1xuICAgICAgICBjbGllbnRGaWxlczogWycuL2luZGV4Lmh0bWwnLCAnLi9zcmMve3ZpZXdzLGNvbXBvbmVudHN9LyonXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQGMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2NvbXBvbmVudHMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAaCc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbXlob29rcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0B1dGlscyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvdXRpbHMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAaG9va3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2hvb2tzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGxheW91dHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2xheW91dHMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAZGlyZWN0aXZlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvZGlyZWN0aXZlcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0Bsb2dpY3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2xvZ2ljcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BkZXNpZ24nOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2Rlc2lnbicpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BlbnVtcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvZW51bXMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAbG9jYWxlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbG9jYWxlcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BzZXR0aW5ncyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvc2V0dGluZ3MnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAc3RvcmUnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL3N0b3JlJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQHJvdXRlcic6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvcm91dGVyJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQHZpZXdzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy92aWV3cycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUixTQUFTLCtCQUErQjtBQUMxVCxTQUFTLGVBQWU7QUFFeEIsT0FBTyxnQkFBZ0I7QUFJdkIsT0FBTyxvQkFBb0I7QUFQM0IsSUFBTSxtQ0FBbUM7QUFhekMsSUFBTyxzQkFBUSx3QkFBd0I7QUFBQSxFQUNyQyxXQUFXO0FBQUEsSUFDVCxTQUFTO0FBQUE7QUFBQSxNQUVQLGVBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtmLFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQTtBQUFBLFFBQzdCLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQTtBQUFBLFVBQ1QsVUFBVTtBQUFBO0FBQUEsVUFDVixrQkFBa0I7QUFBQTtBQUFBLFFBQ3BCO0FBQUEsUUFDQSxLQUFLO0FBQUE7QUFBQSxNQUNQLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBYUg7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxrQkFBa0I7QUFBQSxVQUNoQixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLGlCQUFpQixHQUFHLEVBQUU7QUFBQSxRQUNuRTtBQUFBLFFBQ0EsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBLFVBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxhQUFhLEdBQUcsRUFBRTtBQUFBLFFBQy9EO0FBQUEsUUFFQSxXQUFXO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLFVBQVUsR0FBRyxFQUFFO0FBQUEsUUFDNUQ7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsZ0JBQWdCLDRCQUE0QjtBQUFBLE1BQzVEO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBO0FBQUEsUUFDOUMsTUFBTSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBO0FBQUEsUUFDM0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsWUFBWSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBO0FBQUEsUUFDakQsZUFBZSxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBO0FBQUEsUUFDdkQsV0FBVyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBO0FBQUEsUUFDL0MsV0FBVyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBO0FBQUEsUUFDL0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsWUFBWSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBO0FBQUEsUUFDakQsYUFBYSxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBO0FBQUEsUUFDbkQsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsV0FBVyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBO0FBQUEsUUFDL0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
