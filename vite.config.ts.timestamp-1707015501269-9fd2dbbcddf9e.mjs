// vite.config.ts
import { defineApplicationConfig } from "file:///E:/JS/work/light-admin/light-admin/internal/vite-config/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "E:\\JS\\work\\light-admin\\light-admin";
var vite_config_default = defineApplicationConfig({
  overrides: {
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
        "@settings": resolve(__vite_injected_original_dirname, "packages/settings")
        // 路径别名
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxKU1xcXFx3b3JrXFxcXGxpZ2h0LWFkbWluXFxcXGxpZ2h0LWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxKU1xcXFx3b3JrXFxcXGxpZ2h0LWFkbWluXFxcXGxpZ2h0LWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9KUy93b3JrL2xpZ2h0LWFkbWluL2xpZ2h0LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQXBwbGljYXRpb25Db25maWcgfSBmcm9tICdAdmJlbi92aXRlLWNvbmZpZyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUFwcGxpY2F0aW9uQ29uZmlnKHtcbiAgb3ZlcnJpZGVzOiB7XG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgICdlY2hhcnRzL2NvcmUnLFxuICAgICAgICAnZWNoYXJ0cy9jaGFydHMnLFxuICAgICAgICAnZWNoYXJ0cy9jb21wb25lbnRzJyxcbiAgICAgICAgJ2VjaGFydHMvcmVuZGVyZXJzJyxcbiAgICAgICAgJ3FyY29kZScsXG4gICAgICAgICdAaWNvbmlmeS9pY29uaWZ5JyxcbiAgICAgICAgJ2FudC1kZXNpZ24tdnVlL2VzL2xvY2FsZS96aF9DTicsXG4gICAgICAgICdhbnQtZGVzaWduLXZ1ZS9lcy9sb2NhbGUvZW5fVVMnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9iYXNpYy1hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeL2Jhc2ljLWFwaWApLCAnJyksXG4gICAgICAgICAgLy8gb25seSBodHRwc1xuICAgICAgICAgIC8vIHNlY3VyZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgJy91cGxvYWQnOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMzAwL3VwbG9hZCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXi91cGxvYWRgKSwgJycpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHdhcm11cDoge1xuICAgICAgICBjbGllbnRGaWxlczogWycuL2luZGV4Lmh0bWwnLCAnLi9zcmMve3ZpZXdzLGNvbXBvbmVudHN9LyonXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQGMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzL2NvbXBvbmVudHMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAaCc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbXlob29rcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0B1dGlscyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvdXRpbHMnKSwgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICAgICdAbGF5b3V0cyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbGF5b3V0cycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0BkaXJlY3RpdmVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9kaXJlY3RpdmVzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGxvZ2ljcyc6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvbG9naWNzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGRlc2lnbic6IHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMvZGVzaWduJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQGVudW1zJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9lbnVtcycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgICAgJ0Bsb2NhbGVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9sb2NhbGVzJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgICAnQHNldHRpbmdzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcy9zZXR0aW5ncycpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUyxTQUFTLCtCQUErQjtBQUMxVSxTQUFTLGVBQWU7QUFEeEIsSUFBTSxtQ0FBbUM7QUFHekMsSUFBTyxzQkFBUSx3QkFBd0I7QUFBQSxFQUNyQyxXQUFXO0FBQUEsSUFDVCxjQUFjO0FBQUEsTUFDWixTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBLFVBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxhQUFhLEdBQUcsRUFBRTtBQUFBO0FBQUE7QUFBQSxRQUcvRDtBQUFBLFFBQ0EsV0FBVztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBLFVBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxVQUFVLEdBQUcsRUFBRTtBQUFBLFFBQzVEO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sYUFBYSxDQUFDLGdCQUFnQiw0QkFBNEI7QUFBQSxNQUM1RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLE1BQU0sUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQTtBQUFBLFFBQzlDLE1BQU0sUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQTtBQUFBLFFBQzNDLFVBQVUsUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQTtBQUFBLFFBQzdDLFlBQVksUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQTtBQUFBLFFBQ2pELGVBQWUsUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQTtBQUFBLFFBQ3ZELFdBQVcsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQTtBQUFBLFFBQy9DLFdBQVcsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQTtBQUFBLFFBQy9DLFVBQVUsUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQTtBQUFBLFFBQzdDLFlBQVksUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQTtBQUFBLFFBQ2pELGFBQWEsUUFBUSxrQ0FBVyxtQkFBbUI7QUFBQTtBQUFBLE1BQ3JEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
