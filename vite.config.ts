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
      // ✅ Verbeterd: Geen inlineDynamicImports meer!
      // Splits in meerdere chunks voor betere performance
      rollupOptions: {
        output: {
          manualChunks: {
            // Grote libraries apart bundelen
            'react-vendor': ['react', 'react-dom'],
            'firebase-vendor': ['firebase'],
            'motion-vendor': ['motion', 'framer-motion'],
            'icon-vendor': ['lucide-react'],
            'maps-vendor': ['@vis.gl/react-google-maps'],
          },
          // Duidelijke chunk namen
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
      chunkSizeWarningLimit: 500, // Striktere limiet (was 3000)
      target: 'es2020', // Modernere browsers
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // ✅ Server optimalisaties
    server: {
      hmr: {
        overlay: false, // Snellere HMR
      },
    },
    // ✅ Preview optimalisaties
    preview: {
      port: 4173,
      strictPort: true,
    },
  };
});