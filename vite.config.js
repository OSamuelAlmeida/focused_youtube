import vue from "@vitejs/plugin-vue"
import path from "path"
import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@js": path.resolve(__dirname, "./src/js"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [vue(), eslint()],
  build: {
    rollupOptions: {
      input: {
        popup: "src/popup.js",
        extension: "src/extension.js",
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
