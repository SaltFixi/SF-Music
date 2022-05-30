import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: '/',
  server: {
    port: 8080,
    open: true,
    // proxy: {
    //   '/api/': {
    //     changeOrigin: true,
    //     target: "localhost:0.0.0.0",
    //     rewrite: {
    //       '^/api/': ''
    //     }
    //   }
    // }
  },
  // 更改别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "coms": path.resolve(__dirname, "src/components"),
      "router": path.resolve(__dirname, "src/router"),
      "store": path.resolve(__dirname, "src/store"),
      "views": path.resolve(__dirname, "src/views"),
      "utils": path.resolve(__dirname, "src/utils"),
      "plugin": path.resolve(__dirname, "src/plugin"),
      "api": path.resolve(__dirname, "src/api"),
      "icon": path.resolve(__dirname, "src/assets/js")
    }
  },
  plugins: [
    vue(),
    // 通过cnpm install的方式安装的vite导入vant可能会报错，路径是在vant/es下
    styleImport({
      resolves: [VantResolve()],
      // libs: [
      //   {
      //     libraryName: 'vant',
      //     esModule: true,
      //     resolveStyle: (name) => {
      //       return `../es/${name}/style/index`
      //     }
      //   },
      // ],
    }),
  ],
  // 全局样式混入配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/mixin.scss";',
      },
    },
  },
})
