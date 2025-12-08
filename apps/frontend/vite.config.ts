import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { aliases, createFsAllow } from '../../config/build-config';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html', // Output file
      template: 'sunburst', // Other options: sunburst, network
      gzipSize: true, // Show gzipped size
      brotliSize: true, // Show brotli size
    }),
  ],

  resolve: {
    alias: aliases,
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: createFsAllow(__dirname),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor.react';
            if (id.includes('react-dom')) return 'vendor.react-dom';
            if (id.includes('react-router-dom')) return 'vendor.router';
            if (id.includes('@tanstack')) return 'vendor.react-query';
            if (id.includes('@supabase')) return 'vendor.supabase';
            if (id.includes('react-hook-form')) return 'vendor.react-hook-form';
            if (id.includes('@hookform/resolvers'))
              return 'vendor.hookform-resolvers';
            if (id.includes('zod')) return 'vendor.zod';
            if (id.includes('dayjs')) return 'vendor.dayjs';
            if (id.includes('i18next')) return 'vendor.i18n';
            if (id.includes('react-i18next')) return 'vendor.react-i18n';
            if (id.includes('react-toastify')) return 'vendor.toastify';
            return 'vendor';
          }
        },
      },
    },
  },
});
