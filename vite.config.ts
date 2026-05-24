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
      cssCodeSplit: true, // Zorgt ervoor dat CSS van componenten buiten het scherm de Hero niet blokkeert
      minify: 'esbuild',
      modulePreload: {
        polyfill: false,
        resolveDependencies: (filename, deps, { container }) => {
          // Voorkomt dat er diepe, blokkerende netwerkketens ontstaan op mobiel
          return [];
        }
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          manualChunks: (id) => {
            // Breng de rust terug in de netwerkboom door externe libraries compact te groeperen
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-framework';
              if (id.includes('motion') || id.includes('lucide')) return 'vendor-ui';
              if (id.includes('@vis.gl')) return 'vendor-maps';
              return 'vendor-utils';
            }
          },
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
      chunkSizeWarningLimit: 1200,
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
