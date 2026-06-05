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
      cssCodeSplit: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'firebase-vendor': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
            'motion-vendor': ['motion', 'framer-motion'],
            'icon-vendor': ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 500,
      target: 'es2020',
      commonjsOptions: {
        include: [/firebase/, /node_modules/],
        transformMixedEsModules: true,
      },
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      dedupe: ['firebase', 'react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['firebase/app', 'firebase/firestore', 'firebase/auth', 'react', 'react-dom'],
      esbuildOptions: {
        target: 'es2020',
      },
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
  };
});