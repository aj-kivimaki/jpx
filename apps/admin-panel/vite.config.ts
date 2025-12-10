import react from '@vitejs/plugin-react';
import { PluginVisualizerOptions, visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

import {
  aliases,
  createFsAllow,
  visualizerConfig,
} from '../../config/build-config';

export default defineConfig({
  plugins: [react(), visualizer(visualizerConfig as PluginVisualizerOptions)],
  resolve: {
    alias: aliases,
  },
  server: {
    port: 5174,
    open: true,
    fs: { allow: createFsAllow(__dirname) },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          const vendorMap = [
            { match: 'react', chunk: 'vendor.react' },
            { match: 'react-dom', chunk: 'vendor.react-dom' },
            { match: 'react-router-dom', chunk: 'vendor.router' },
            {
              match: '@tanstack/react-query-devtools',
              chunk: 'vendor.react-query-devtools',
            },
            { match: '@tanstack/react-query', chunk: 'vendor.react-query' },
            { match: '@supabase', chunk: 'vendor.supabase' },
            { match: 'react-hook-form', chunk: 'vendor.react-hook-form' },
            {
              match: '@hookform/resolvers',
              chunk: 'vendor.hookform-resolvers',
            },
            { match: 'zod', chunk: 'vendor.zod' },
            { match: 'dayjs', chunk: 'vendor.dayjs' },
            { match: 'zustand', chunk: 'vendor.zustand' },
            { match: 'i18next', chunk: 'vendor.i18n' },
            { match: 'react-i18next', chunk: 'vendor.react-i18n' },
            { match: 'react-toastify', chunk: 'vendor.toastify' },
            { match: 'dompurify', chunk: 'vendor.dompurify' },
          ];

          const found = vendorMap.find((entry) => id.includes(entry.match));
          return found ? found.chunk : 'vendor';
        },
      },
    },
  },
});
