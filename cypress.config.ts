import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    video: false,
    screenshotOnRunFailure: false,
    viewportWidth: 1020,
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  }
});
