import { createSharedViteConfig } from '@jpx/config';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    ...createSharedViteConfig({
      appDir: __dirname,
    }),

    server: {
      port: 5174,
    },
  };
});
