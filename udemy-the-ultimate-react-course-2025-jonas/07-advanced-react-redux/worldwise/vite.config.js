import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig(() => {

  return {
    plugins: [
      react(),
      eslint()
    ],
    resolve: {
      alias: {
        'react-dom/client': 'react-dom/profiling',
      },
    },
  }
})
