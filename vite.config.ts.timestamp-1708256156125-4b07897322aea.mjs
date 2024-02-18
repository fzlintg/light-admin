// vite.config.ts
import { defineApplicationConfig } from "file:///D:/js/work/light-admin/light-admin/internal/vite-config/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///D:/js/work/light-admin/light-admin/node_modules/.store/unplugin-auto-import@0.17.5/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "D:\\js\\work\\light-admin\\light-admin";
var vite_config_default = defineApplicationConfig({
  overrides: {
    plugins: [
      AutoImport({
        imports: ["vue", "vue-router"],
        // 自动导入vue和vue-router相关函数
        dts: "src/auto-import.d.ts"
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
        "@store": resolve(__vite_injected_original_dirname, "packages/store")
        // 路径别名
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxqc1xcXFx3b3JrXFxcXGxpZ2h0LWFkbWluXFxcXGxpZ2h0LWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxqc1xcXFx3b3JrXFxcXGxpZ2h0LWFkbWluXFxcXGxpZ2h0LWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9qcy93b3JrL2xpZ2h0LWFkbWluL2xpZ2h0LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQXBwbGljYXRpb25Db25maWcgfSBmcm9tICdAdmJlbi92aXRlLWNvbmZpZyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuXG4vLyBpbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnO1xuLy8gaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVBcHBsaWNhdGlvbkNvbmZpZyh7XG4gIG92ZXJyaWRlczoge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NXZ1ZVx1NTQ4Q3Z1ZS1yb3V0ZXJcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcbiAgICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0LmQudHMnLCAvLyBcdTc1MUZcdTYyMTAgYGF1dG8taW1wb3J0LmQudHNgIFx1NTE2OFx1NUM0MFx1NThGMFx1NjYwRVxuICAgICAgfSksXG4gICAgICAvLyBQYWdlcyh7XG4gICAgICAvLyAgIC8vIFx1OTcwMFx1ODk4MVx1NzUxRlx1NjIxMFx1OERFRlx1NzUzMVx1NzY4NFx1NjU4N1x1NEVGNlx1NzZFRVx1NUY1NVx1RkYwQ1x1OUVEOFx1OEJBNFx1NUMzMVx1NjYyRlx1OEJDNlx1NTIyQnNyY1x1NEUwQlx1OTc2Mlx1NzY4NHBhZ2VzXHU2NTg3XHU0RUY2XG4gICAgICAvLyAgIHBhZ2VzRGlyOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpICsgJy9wYWdlcycsXG4gICAgICAvLyAgIC8vZGlyczogXCJzcmMvcGFnZXNcIixcblxuICAgICAgLy8gICAvLyBcdTYzOTJcdTk2NjRcdTU3MjhcdTU5MTZcdTc2ODRcdTc2RUVcdTVGNTVcdUZGMENcdTUzNzNcdTRFMERcdTVDMDZcdTYyNDBcdTY3MDkgY29tcG9uZW50cyBcdTc2RUVcdTVGNTVcdTRFMEJcdTc2ODQgLnZ1ZSBcdTY1ODdcdTRFRjZcdTc1MUZcdTYyMTBcdThERUZcdTc1MzFcbiAgICAgIC8vICAgZXhjbHVkZTogWycqKi9jb21wb25lbnRzLyoudnVlJ10sXG4gICAgICAvLyB9KSxcbiAgICAgIC8vIExheW91dHMoe1xuICAgICAgLy8gICBsYXlvdXRzRGlyczogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSArICcvbGF5b3V0cycsXG4gICAgICAvLyB9KSxcbiAgICBdLFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogW1xuICAgICAgICAnZWNoYXJ0cy9jb3JlJyxcbiAgICAgICAgJ2VjaGFydHMvY2hhcnRzJyxcbiAgICAgICAgJ2VjaGFydHMvY29tcG9uZW50cycsXG4gICAgICAgICdlY2hhcnRzL3JlbmRlcmVycycsXG4gICAgICAgICdxcmNvZGUnLFxuICAgICAgICAnQGljb25pZnkvaWNvbmlmeScsXG4gICAgICAgICdhbnQtZGVzaWduLXZ1ZS9lcy9sb2NhbGUvemhfQ04nLFxuICAgICAgICAnYW50LWRlc2lnbi12dWUvZXMvbG9jYWxlL2VuX1VTJyxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvYmFzaWMtYXBpJzoge1xuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXi9iYXNpYy1hcGlgKSwgJycpLFxuICAgICAgICAgIC8vIG9ubHkgaHR0cHNcbiAgICAgICAgICAvLyBzZWN1cmU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgICcvdXBsb2FkJzoge1xuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzMwMC91cGxvYWQnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vdXBsb2FkYCksICcnKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB3YXJtdXA6IHtcbiAgICAgICAgY2xpZW50RmlsZXM6IFsnLi9pbmRleC5odG1sJywgJy4vc3JjL3t2aWV3cyxjb21wb25lbnRzfS8qJ10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0BjJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9jb21wb25lbnRzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGgnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL215aG9va3MnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAdXRpbHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL3V0aWxzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGxheW91dHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2xheW91dHMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAZGlyZWN0aXZlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvZGlyZWN0aXZlcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0Bsb2dpY3MnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2xvZ2ljcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BkZXNpZ24nOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2Rlc2lnbicpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BlbnVtcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvZW51bXMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAbG9jYWxlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbG9jYWxlcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BzZXR0aW5ncyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvc2V0dGluZ3MnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAc3RvcmUnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL3N0b3JlJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtTLFNBQVMsK0JBQStCO0FBQzFVLFNBQVMsZUFBZTtBQUV4QixPQUFPLGdCQUFnQjtBQUh2QixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLHdCQUF3QjtBQUFBLEVBQ3JDLFdBQVc7QUFBQSxJQUNULFNBQVM7QUFBQSxNQUNQLFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQTtBQUFBLFFBQzdCLEtBQUs7QUFBQTtBQUFBLE1BQ1AsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFZSDtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1osU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLElBQUk7QUFBQSxVQUNKLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLE9BQU8sYUFBYSxHQUFHLEVBQUU7QUFBQTtBQUFBO0FBQUEsUUFHL0Q7QUFBQSxRQUNBLFdBQVc7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLElBQUk7QUFBQSxVQUNKLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLE9BQU8sVUFBVSxHQUFHLEVBQUU7QUFBQSxRQUM1RDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGFBQWEsQ0FBQyxnQkFBZ0IsNEJBQTRCO0FBQUEsTUFDNUQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxNQUFNLFFBQVEsa0NBQVcscUJBQXFCO0FBQUE7QUFBQSxRQUM5QyxNQUFNLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUE7QUFBQSxRQUMzQyxVQUFVLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUE7QUFBQSxRQUM3QyxZQUFZLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUE7QUFBQSxRQUNqRCxlQUFlLFFBQVEsa0NBQVcscUJBQXFCO0FBQUE7QUFBQSxRQUN2RCxXQUFXLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUE7QUFBQSxRQUMvQyxXQUFXLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUE7QUFBQSxRQUMvQyxVQUFVLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUE7QUFBQSxRQUM3QyxZQUFZLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUE7QUFBQSxRQUNqRCxhQUFhLFFBQVEsa0NBQVcsbUJBQW1CO0FBQUE7QUFBQSxRQUNuRCxVQUFVLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUE7QUFBQSxNQUMvQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
