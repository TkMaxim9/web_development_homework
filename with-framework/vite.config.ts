import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Импорт vitest
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts', // создадим чуть позже
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
})
