
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative base path. This is the safest option for GitHub Pages
  // as it allows index.html to find assets in the same directory.
  base: './', 
});
