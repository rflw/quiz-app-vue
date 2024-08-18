import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  plugins: [vue()],
  server: {
    host: true,
    port: 8000, // Use this port in Docker
    watch: {
      // usePolling: true // Add this line if you're using Windows and hot reload doesn't work
    }
  }
});
