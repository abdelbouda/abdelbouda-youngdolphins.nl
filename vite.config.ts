import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Gebruik import.meta.env voor moderne Vite projecten
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(env.GOOGLE_MAPS_PLATFORM_KEY || ''),
    },
    build: {
      cssCodeSplit: false,
      minify: 'esbuild',
      // Optimalisatie: Verminder bundle size
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
      chunkSizeWarningLimit: 3000,
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    resolve: {
      alias: {
        // Gebruikelijk: @ wijst naar de 'src' map voor schonere imports
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
