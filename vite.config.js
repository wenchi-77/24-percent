import { defineConfig } from 'vite';

export default defineConfig({
  base: '/24-percent/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        design: 'design.html',
        impact: 'impact.html',
        system: 'system.html'
      }
    }
  }
});
