import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-github-search/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '@testing-library/jest-dom',
    mockReset: true
  }
})
