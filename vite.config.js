import dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0'
  },
})
