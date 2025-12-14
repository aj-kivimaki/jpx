import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { UserConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Shared aliases for the monorepo
export const aliases = {
  '@jpx/shared': path.resolve(__dirname, '../../shared/src'),
  '@jpx/ui': path.resolve(__dirname, '../../ui/src'),
  '@jpx/config': path.resolve(__dirname, '.'),
};

// Shared fs.allow configuration for apps
export const createFsAllow = (appDir: string) => [
  path.resolve(appDir),
  path.resolve(appDir, '../../packages'),
  path.resolve(appDir, '../../'),
];

export type SharedOptions = {
  appDir: string;
};

export const createSharedViteConfig = ({
  appDir,
}: SharedOptions): UserConfig => {
  const plugins = [react()];

  return {
    plugins,
    resolve: {
      alias: aliases,
    },
    server: {
      strictPort: true,
      open: true,
      fs: {
        allow: createFsAllow(appDir),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return;

            const vendorMap = [
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
  };
};
