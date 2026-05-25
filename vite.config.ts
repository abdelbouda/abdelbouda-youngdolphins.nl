import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(env.GOOGLE_MAPS_PLATFORM_KEY || ''),
    },
    build: {
      // OMDRAAIING: CSS splitsen voor snellere 'first paint'
      cssCodeSplit: true, 
      minify: 'esbuild',
      modulePreload: {
        polyfill: false
      },
      rollupOptions: {
        output: {
          // OMDRAAIING: Dynamische imports splitsen in aparte chunks
          inlineDynamicImports: false, 
          manualChunks(id) {
            // Scheid React en zware libs van je eigen code voor betere caching
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
      chunkSizeWarningLimit: 1000, // Strengere limiet om te waken voor te grote chunks
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Aangepast naar ./src voor betere pad-resolutie
      },
    },
  };
});
