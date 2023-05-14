import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 80,
    proxy: {
      '/api': {
        target: 'https://notas-api-production.up.railway.app/',
        changeOrigin: true
      }
    }
  }
})
