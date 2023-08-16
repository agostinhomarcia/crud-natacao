// Importando o 'defineConfig' do Vite e o plugin 'react'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Importando a configuração do Tailwind CSS

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})

