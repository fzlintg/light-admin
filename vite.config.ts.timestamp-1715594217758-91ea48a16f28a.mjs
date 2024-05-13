// vite.config.ts
import { defineApplicationConfig } from "file:///E:/JS/work/admin/light-admin/internal/vite-config/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///E:/JS/work/admin/light-admin/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0_vue@3.4.26_typescript@5.4.5___rollup@3.29.4/node_modules/unplugin-auto-import/dist/vite.js";
import VueSetupExtend from "file:///E:/JS/work/admin/light-admin/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@5.2.11_@types+node@20.10.6_less@4.2.0_sass@1.69.7_terser@5.26.0_/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\JS\\work\\admin\\light-admin";
var vite_config_default = defineApplicationConfig({
  overrides: {
    plugins: [
      VueSetupExtend(),
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
        "/basic-api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), "")
          // only https
          // secure: false
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxKU1xcXFx3b3JrXFxcXGFkbWluXFxcXGxpZ2h0LWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxKU1xcXFx3b3JrXFxcXGFkbWluXFxcXGxpZ2h0LWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9KUy93b3JrL2FkbWluL2xpZ2h0LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQXBwbGljYXRpb25Db25maWcgfSBmcm9tICdAdmJlbi92aXRlLWNvbmZpZyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnO1xuLy8gaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJztcbi8vIGltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQXBwbGljYXRpb25Db25maWcoe1xuICBvdmVycmlkZXM6IHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICBWdWVTZXR1cEV4dGVuZCgpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1dnVlXHU1NDhDdnVlLXJvdXRlclx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFxuICAgICAgICBlc2xpbnRyYzoge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIERlZmF1bHQgYGZhbHNlYFxuICAgICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsIC8vIERlZmF1bHQgYC4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25gXG4gICAgICAgICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZSwgLy8gRGVmYXVsdCBgdHJ1ZWAsICh0cnVlIHwgZmFsc2UgfCAncmVhZG9ubHknIHwgJ3JlYWRhYmxlJyB8ICd3cml0YWJsZScgfCAnd3JpdGVhYmxlJylcbiAgICAgICAgfSxcbiAgICAgICAgZHRzOiAndHlwZXMvYXV0by1pbXBvcnQuZC50cycsIC8vIFx1NzUxRlx1NjIxMCBgYXV0by1pbXBvcnQuZC50c2AgXHU1MTY4XHU1QzQwXHU1OEYwXHU2NjBFXG4gICAgICB9KSxcbiAgICAgIC8vIFBhZ2VzKHtcbiAgICAgIC8vICAgLy8gXHU5NzAwXHU4OTgxXHU3NTFGXHU2MjEwXHU4REVGXHU3NTMxXHU3Njg0XHU2NTg3XHU0RUY2XHU3NkVFXHU1RjU1XHVGRjBDXHU5RUQ4XHU4QkE0XHU1QzMxXHU2NjJGXHU4QkM2XHU1MjJCc3JjXHU0RTBCXHU5NzYyXHU3Njg0cGFnZXNcdTY1ODdcdTRFRjZcbiAgICAgIC8vICAgcGFnZXNEaXI6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgKyAnL3BhZ2VzJyxcbiAgICAgIC8vICAgLy9kaXJzOiBcInNyYy9wYWdlc1wiLFxuXG4gICAgICAvLyAgIC8vIFx1NjM5Mlx1OTY2NFx1NTcyOFx1NTkxNlx1NzY4NFx1NzZFRVx1NUY1NVx1RkYwQ1x1NTM3M1x1NEUwRFx1NUMwNlx1NjI0MFx1NjcwOSBjb21wb25lbnRzIFx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCAudnVlIFx1NjU4N1x1NEVGNlx1NzUxRlx1NjIxMFx1OERFRlx1NzUzMVxuICAgICAgLy8gICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKi52dWUnXSxcbiAgICAgIC8vIH0pLFxuICAgICAgLy8gTGF5b3V0cyh7XG4gICAgICAvLyAgIGxheW91dHNEaXJzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpICsgJy9sYXlvdXRzJyxcbiAgICAgIC8vIH0pLFxuICAgIF0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgICdlY2hhcnRzL2NvcmUnLFxuICAgICAgICAnZWNoYXJ0cy9jaGFydHMnLFxuICAgICAgICAnZWNoYXJ0cy9jb21wb25lbnRzJyxcbiAgICAgICAgJ2VjaGFydHMvcmVuZGVyZXJzJyxcbiAgICAgICAgJ3FyY29kZScsXG4gICAgICAgICdAaWNvbmlmeS9pY29uaWZ5JyxcbiAgICAgICAgJ2FudC1kZXNpZ24tdnVlL2VzL2xvY2FsZS96aF9DTicsXG4gICAgICAgICdhbnQtZGVzaWduLXZ1ZS9lcy9sb2NhbGUvZW5fVVMnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9iYXNpYy1hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeL2Jhc2ljLWFwaWApLCAnJyksXG4gICAgICAgICAgLy8gb25seSBodHRwc1xuICAgICAgICAgIC8vIHNlY3VyZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgJy91cGxvYWQnOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMzAwL3VwbG9hZCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXi91cGxvYWRgKSwgJycpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHdhcm11cDoge1xuICAgICAgICBjbGllbnRGaWxlczogWycuL2luZGV4Lmh0bWwnLCAnLi9zcmMve3ZpZXdzLGNvbXBvbmVudHN9LyonXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQGMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2NvbXBvbmVudHMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAaCc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbXlob29rcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0B1dGlscyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvdXRpbHMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAbGF5b3V0cyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbGF5b3V0cycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BkaXJlY3RpdmVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9kaXJlY3RpdmVzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGxvZ2ljcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbG9naWNzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGRlc2lnbic6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvZGVzaWduJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGVudW1zJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9lbnVtcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0Bsb2NhbGVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9sb2NhbGVzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQHNldHRpbmdzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9zZXR0aW5ncycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BzdG9yZSc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvc3RvcmUnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAcm91dGVyJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9yb3V0ZXInKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAdmlld3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL3ZpZXdzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdSLFNBQVMsK0JBQStCO0FBQ3hULFNBQVMsZUFBZTtBQUV4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLG9CQUFvQjtBQUozQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLHdCQUF3QjtBQUFBLEVBQ3JDLFdBQVc7QUFBQSxJQUNULFNBQVM7QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQTtBQUFBLFFBQzdCLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQTtBQUFBLFVBQ1QsVUFBVTtBQUFBO0FBQUEsVUFDVixrQkFBa0I7QUFBQTtBQUFBLFFBQ3BCO0FBQUEsUUFDQSxLQUFLO0FBQUE7QUFBQSxNQUNQLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBWUg7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLGFBQWEsR0FBRyxFQUFFO0FBQUE7QUFBQTtBQUFBLFFBRy9EO0FBQUEsUUFDQSxXQUFXO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLFVBQVUsR0FBRyxFQUFFO0FBQUEsUUFDNUQ7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsZ0JBQWdCLDRCQUE0QjtBQUFBLE1BQzVEO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBO0FBQUEsUUFDOUMsTUFBTSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBO0FBQUEsUUFDM0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsWUFBWSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBO0FBQUEsUUFDakQsZUFBZSxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBO0FBQUEsUUFDdkQsV0FBVyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBO0FBQUEsUUFDL0MsV0FBVyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBO0FBQUEsUUFDL0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsWUFBWSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBO0FBQUEsUUFDakQsYUFBYSxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBO0FBQUEsUUFDbkQsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsUUFDN0MsV0FBVyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBO0FBQUEsUUFDL0MsVUFBVSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
