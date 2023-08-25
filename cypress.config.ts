import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    viewportWidth: 1020,
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  }
});
