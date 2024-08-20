import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  resolve: {
    conditions: process.env.VITEST ? ['node'] : [],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  plugins: [vue()],
  server: {
    host: true,
    port: 8000,
    watch: {
      // usePolling: true // Add this line if you're using Windows and hot reload doesn't work
    }
  }
});
