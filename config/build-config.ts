import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Shared aliases for the monorepo
export const aliases = {
  '@jpx/shared': path.resolve(__dirname, '../packages/shared/src'),
  '@jpx/ui': path.resolve(__dirname, '../packages/ui/src'),
};

// Shared fs.allow configuration for apps
export const createFsAllow = (appDir: string) => [
  path.resolve(appDir),
  path.resolve(appDir, '../../packages'),
  path.resolve(appDir, '../../'),
];

// Shared visualizer settings
export const visualizerConfig = {
  filename: './dist/stats.html', // Output file
  template: 'sunburst', // Other options: sunburst, network
  gzipSize: true, // Show gzipped size
  brotliSize: true, // Show brotli size
};
