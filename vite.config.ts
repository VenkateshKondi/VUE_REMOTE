import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), federation({
    name: 'remote-app',
    filename: 'remoteEntry.js',
    exposes: {
      './Module': './src/App.vue',
    },
    shared: ['vue']
  })],
  server: {
    port: 5001
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    polyfillModulePreload: false,
    assetsInlineLimit: 40960,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },


})
