import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path to your repository name for GitHub Pages deployment.
  // This corresponds to https://bagusmur1997.github.io/Test/
  base: '/Test/', 
});