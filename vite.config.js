import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http:localhost:8085',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false,
        configure: (proxy, options) => {
          // 配置此项可在响应头中看到请求的真实地址
          proxy.on('proxyRes', (proxyRes, req) => {
            proxyRes.headers['x-real-url'] = new URL(req.url || '', options.target)?.href || ''
          })
        },
      }
      
    }
  }
})
