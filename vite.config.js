import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import postcsspxtoviewport from 'postcss-px-to-viewport'

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
        postcsspxtoviewport({
          viewportWidth: 375,
          viewportHeight: 667,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: ['.ignore'],
          minPixelValue: 1,
          mediaQuery: false
        })
      ]
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  }
})
