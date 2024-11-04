import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Make sure this is set correctly for your deployment.
  build: {
    chunkSizeWarningLimit: 1600,  // Increase the chunk size warning limit if necessary.
    rollupOptions: {
      output: {
        manualChunks: undefined,  // Disable manual chunking.
      },
    },
  },
  server: {
    open: true,  // Opens the browser automatically when running the server.
    historyApiFallback: true,  // Enable SPA fallback routing for React Router.
  },
  resolve: {
    alias: {
      '@': '/src',  // Set up path alias for more convenient imports.
    },
  },
});


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
