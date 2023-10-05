import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    cors:true,
    host:true,
    port: 5179
  },
  build: {
    outDir: 'dist',
  }
})
