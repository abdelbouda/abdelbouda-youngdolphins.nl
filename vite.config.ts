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
      cssCodeSplit: true, // Zorgt ervoor dat de CSS van zware componenten pas laadt als ze nodig zijn
      minify: 'esbuild',
      modulePreload: {
        polyfill: false
      },
      rollupOptions: {
        output: {
          // Geen inlineDynamicImports meer om de server-overhead (302ms) te elimineren
          inlineDynamicImports: false,
          manualChunks: {
            // We isoleren de zware jongens die NIET in de Hero-sectie staan
            'vendor-maps': ['@vis.gl/react-google-maps'],
            'vendor-libs': ['motion', 'lucide-react'],
            'vendor-react': ['react', 'react-dom']
          },
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
      chunkSizeWarningLimit: 1000,
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
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
