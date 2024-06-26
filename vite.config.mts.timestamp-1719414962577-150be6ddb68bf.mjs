// vite.config.mts
import { defineApplicationConfig } from "file:///D:/js/work/admin/light-admin/internal/vite-config/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///D:/js/work/admin/light-admin/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0_vue@3.4.26_typescript@5.4.5___rollup@3.29.4/node_modules/unplugin-auto-import/dist/vite.js";
import VueSetupExtend from "file:///D:/js/work/admin/light-admin/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@5.2.11_@types+node@20.10.6_less@4.2.0_sass@1.69.7_terser@5.26.0_/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\js\\work\\admin\\light-admin";
var vite_config_default = defineApplicationConfig({
  overrides: {
    plugins: [
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcanNcXFxcd29ya1xcXFxhZG1pblxcXFxsaWdodC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcanNcXFxcd29ya1xcXFxhZG1pblxcXFxsaWdodC1hZG1pblxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2pzL3dvcmsvYWRtaW4vbGlnaHQtYWRtaW4vdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQXBwbGljYXRpb25Db25maWcgfSBmcm9tICdAdmJlbi92aXRlLWNvbmZpZyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuLy9pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG4vLyBpbXBvcnQgc3R5bGVJbXBvcnQsIHsgQW5kRGVzaWduVnVlUmVzb2x2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCc7XG4vL2ltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnO1xuLy8gaW1wb3J0IHsgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4sIEFuZERlc2lnblZ1ZVJlc29sdmUgfSBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnQnO1xuLy8gaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJztcbi8vIGltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQXBwbGljYXRpb25Db25maWcoe1xuICBvdmVycmlkZXM6IHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICBWdWVTZXR1cEV4dGVuZCgpLFxuXG4gICAgICAvLyBzdHlsZUltcG9ydCh7XG4gICAgICAvLyAgIHJlc29sdmVzOiBbQW5kRGVzaWduVnVlUmVzb2x2ZSgpXSxcbiAgICAgIC8vIH0pLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1dnVlXHU1NDhDdnVlLXJvdXRlclx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFxuICAgICAgICBlc2xpbnRyYzoge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIERlZmF1bHQgYGZhbHNlYFxuICAgICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsIC8vIERlZmF1bHQgYC4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25gXG4gICAgICAgICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZSwgLy8gRGVmYXVsdCBgdHJ1ZWAsICh0cnVlIHwgZmFsc2UgfCAncmVhZG9ubHknIHwgJ3JlYWRhYmxlJyB8ICd3cml0YWJsZScgfCAnd3JpdGVhYmxlJylcbiAgICAgICAgfSxcbiAgICAgICAgZHRzOiAndHlwZXMvYXV0by1pbXBvcnQuZC50cycsIC8vIFx1NzUxRlx1NjIxMCBgYXV0by1pbXBvcnQuZC50c2AgXHU1MTY4XHU1QzQwXHU1OEYwXHU2NjBFXG4gICAgICB9KSxcblxuICAgICAgLy8gUGFnZXMoe1xuICAgICAgLy8gICAvLyBcdTk3MDBcdTg5ODFcdTc1MUZcdTYyMTBcdThERUZcdTc1MzFcdTc2ODRcdTY1ODdcdTRFRjZcdTc2RUVcdTVGNTVcdUZGMENcdTlFRDhcdThCQTRcdTVDMzFcdTY2MkZcdThCQzZcdTUyMkJzcmNcdTRFMEJcdTk3NjJcdTc2ODRwYWdlc1x1NjU4N1x1NEVGNlxuICAgICAgLy8gICBwYWdlc0RpcjogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSArICcvcGFnZXMnLFxuICAgICAgLy8gICAvL2RpcnM6IFwic3JjL3BhZ2VzXCIsXG5cbiAgICAgIC8vICAgLy8gXHU2MzkyXHU5NjY0XHU1NzI4XHU1OTE2XHU3Njg0XHU3NkVFXHU1RjU1XHVGRjBDXHU1MzczXHU0RTBEXHU1QzA2XHU2MjQwXHU2NzA5IGNvbXBvbmVudHMgXHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0IC52dWUgXHU2NTg3XHU0RUY2XHU3NTFGXHU2MjEwXHU4REVGXHU3NTMxXG4gICAgICAvLyAgIGV4Y2x1ZGU6IFsnKiovY29tcG9uZW50cy8qLnZ1ZSddLFxuICAgICAgLy8gfSksXG4gICAgICAvLyBMYXlvdXRzKHtcbiAgICAgIC8vICAgbGF5b3V0c0RpcnM6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgKyAnL2xheW91dHMnLFxuICAgICAgLy8gfSksXG4gICAgXSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgJ2VjaGFydHMvY29yZScsXG4gICAgICAgICdlY2hhcnRzL2NoYXJ0cycsXG4gICAgICAgICdlY2hhcnRzL2NvbXBvbmVudHMnLFxuICAgICAgICAnZWNoYXJ0cy9yZW5kZXJlcnMnLFxuICAgICAgICAncXJjb2RlJyxcbiAgICAgICAgJ0BpY29uaWZ5L2ljb25pZnknLFxuICAgICAgICAnYW50LWRlc2lnbi12dWUvZXMvbG9jYWxlL3poX0NOJyxcbiAgICAgICAgJ2FudC1kZXNpZ24tdnVlL2VzL2xvY2FsZS9lbl9VUycsXG4gICAgICBdLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwcm94eToge1xuICAgICAgICAnL2Jhc2ljLWFwaS9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo3MDAxJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeL2Jhc2ljLWFwaS9hcGlgKSwgJycpLFxuICAgICAgICB9LFxuICAgICAgICAnL2Jhc2ljLWFwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vYmFzaWMtYXBpYCksICcnKSxcbiAgICAgICAgfSxcblxuICAgICAgICAnL3VwbG9hZCc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMzMDAvdXBsb2FkJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeL3VwbG9hZGApLCAnJyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgd2FybXVwOiB7XG4gICAgICAgIGNsaWVudEZpbGVzOiBbJy4vaW5kZXguaHRtbCcsICcuL3NyYy97dmlld3MsY29tcG9uZW50c30vKiddLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAYyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvY29tcG9uZW50cycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BoJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9teWhvb2tzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQHV0aWxzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy91dGlscycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0Bob29rcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvaG9va3MnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAbGF5b3V0cyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbGF5b3V0cycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BkaXJlY3RpdmVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9kaXJlY3RpdmVzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGxvZ2ljcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbG9naWNzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGRlc2lnbic6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvZGVzaWduJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGVudW1zJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9lbnVtcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0Bsb2NhbGVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9sb2NhbGVzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQHNldHRpbmdzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9zZXR0aW5ncycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BzdG9yZSc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvc3RvcmUnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAcm91dGVyJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9yb3V0ZXInKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAdmlld3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL3ZpZXdzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtSLFNBQVMsK0JBQStCO0FBQzFULFNBQVMsZUFBZTtBQUV4QixPQUFPLGdCQUFnQjtBQUl2QixPQUFPLG9CQUFvQjtBQVAzQixJQUFNLG1DQUFtQztBQVl6QyxJQUFPLHNCQUFRLHdCQUF3QjtBQUFBLEVBQ3JDLFdBQVc7QUFBQSxJQUNULFNBQVM7QUFBQSxNQUNQLGVBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtmLFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQTtBQUFBLFFBQzdCLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQTtBQUFBLFVBQ1QsVUFBVTtBQUFBO0FBQUEsVUFDVixrQkFBa0I7QUFBQTtBQUFBLFFBQ3BCO0FBQUEsUUFDQSxLQUFLO0FBQUE7QUFBQSxNQUNQLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBYUg7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxrQkFBa0I7QUFBQSxVQUNoQixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLGlCQUFpQixHQUFHLEVBQUU7QUFBQSxRQUNuRTtBQUFBLFFBQ0EsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBLFVBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxhQUFhLEdBQUcsRUFBRTtBQUFBLFFBQy9EO0FBQUEsUUFFQSxXQUFXO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLFVBQVUsR0FBRyxFQUFFO0FBQUEsUUFDNUQ7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsZ0JBQWdCLDRCQUE0QjtBQUFBLE1BQzVEO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBO0FBQUEsUUFDOUMsTUFBTSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBO0FBQUEsUUFDM0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsWUFBWSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBO0FBQUEsUUFDakQsZUFBZSxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBO0FBQUEsUUFDdkQsV0FBVyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBO0FBQUEsUUFDL0MsV0FBVyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBO0FBQUEsUUFDL0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsWUFBWSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBO0FBQUEsUUFDakQsYUFBYSxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBO0FBQUEsUUFDbkQsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsV0FBVyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBO0FBQUEsUUFDL0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
