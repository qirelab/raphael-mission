// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tagger from '@dhiwise/component-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Optional dev-only proxy. Set VITE_DEV_API_PROXY in a local .env (git-ignored)
  // together with VITE_API_URL=/api to browse the site against a remote API
  // without running the backend locally. Unset — nothing changes, and it never
  // affects `npm run build`.
  const { VITE_DEV_API_PROXY } = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tagger()],
    build: {
      outDir: 'build',
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@pages': path.resolve('./src/pages'),
        '@assets': path.resolve('./src/assets'),
        '@constants': path.resolve('./src/constants'),
        '@styles': path.resolve('./src/styles'),
      },
    },
    server: {
      port: '4028',
      host: '0.0.0.0',
      strictPort: true,
      allowedHosts: ['.amazonaws.com'],
      ...(VITE_DEV_API_PROXY
        ? {
            proxy: {
              '/api': { target: VITE_DEV_API_PROXY, changeOrigin: true, secure: true },
            },
          }
        : {}),
    },
    preview: {
      port: 4173,
      host: '0.0.0.0',
      strictPort: true,
    },
  };
});
