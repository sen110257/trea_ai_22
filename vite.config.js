import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = resolve(fileURLToPath(import.meta.url), '..')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'postcss-px-to-viewport',
          Declaration(decl) {
            if (decl.value.includes('px')) {
              const pxRegex = /(\d+(\.\d+)?)px/g
              const viewportWidth = 375
              decl.value = decl.value.replace(pxRegex, (match, p1) => {
                const px = parseFloat(p1)
                if (px <= 1) return match
                const vw = (px / viewportWidth) * 100
                return vw.toFixed(5) + 'vw'
              })
            }
          }
        }
      ]
    }
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          utils: ['html2canvas']
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'html2canvas']
  }
})
