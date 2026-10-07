import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const backend = 'http://localhost:3001'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // En desarrollo, la API y las fotos de los personajes las sirve el backend
    proxy: {
      '/api': backend,
      '/images': backend,
    },
  },
})
