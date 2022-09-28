import { resolve } from 'path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/lib.tsx'),
      name: 'Editor',
      formats: ['es'],
      fileName: () => `index.js`,
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
