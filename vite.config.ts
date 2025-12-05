import { defineConfig } from 'vite';

export default defineConfig({
  base: '/necro-turtle/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2020'
  },
  server: {
    port: 5173,
    open: true
  }
});
