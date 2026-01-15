import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 
// https://vitejs.dev/config/
export default defineConfig({
  base: '/book-store/', // TODO: 如果部署到 https://<USERNAME>.github.io/<REPO>/，请将此处的 '/book-store/' 替换为你的仓库名 '/<REPO>/'
  plugins: [vue()],
})
