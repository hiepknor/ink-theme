import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  root: new URL('.', import.meta.url).pathname,
  plugins: [tailwindcss()],
  build: {
    outDir: '../../dist/workbench',
    emptyOutDir: true,
  },
});
