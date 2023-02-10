import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd(), ''); 
  return {
    plugins: [react()],
    server: {
      port: env.FRONTEND_PORT
    }, 
    define: {
      FRONTEND_PORT: env.FRONTEND_PORT,
      BACKEND_PORT: env.BACKEND_PORT
    }
  }
})
