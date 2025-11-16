import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],

  // Keep default outDir = "dist" for the main app
  build: {
    outDir: 'dist',

    rollupOptions: {
      input: {
        main: 'index.html', // normal app
        admin: 'src/admin.js', // netlify cms
      },
      output: {
        // Put CMS build assets where Netlify expects admin files
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'admin.js') {
            return 'admin/[name].js';
          }
          return 'assets/[name]-[hash][extname]';
        },
        entryFileNames: (chunk) => {
          if (chunk.name === 'admin') {
            return 'admin/admin.js';
          }
          return 'assets/[name]-[hash].js';
        },
      },
    },
  },
});
