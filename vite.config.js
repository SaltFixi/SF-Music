import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { AJAX_baseURL } from './src/utils/request';

// https://vitejs.dev/config/
export default defineConfig({
  /**
  * 在生产中服务时的基本公共路径。
  * @default '/'
  */
  base: './',

  //  构建
  build: {
    outDir: 'dist', //指定打包输出路径
    assetsDir: 'assets', //指定静态资源存放路径
    cssCodeSplit: true, //css代码拆分,禁用则所有样式保存在一个css里面
    sourcemap: false, //是否构建source map 文件

    //会打包出 css js 等文件夹 目录显得清晰
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api/': {
        changeOrigin: true,
        target: AJAX_baseURL,
        rewrite: {
          '^/api/': ''
        }
      }
    }
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
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => {
            return `../es/${name}/style/index`
          }
        },
      ],
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
