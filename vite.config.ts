import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: VitePWAOptions = {
  registerType: 'autoUpdate',
  workbox: {
    runtimeCaching: [
      // Cache de assets estáticos
      {
        urlPattern: new RegExp('^/assets/.*\\.(js|css|png|jpg|jpeg|svg|woff|woff2|ttf|eot)$'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'assets-cache',
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      // Cache de exercícios (mp4, webm, gif)
      {
        urlPattern: new RegExp('^/exercises/.*\\.(mp4|webm|gif|jpg|jpeg|png)$'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'exercises-cache',
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      // Cache de ícones
      {
        urlPattern: new RegExp('^/icons/.*\\.(png|svg)$'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'icons-cache',
          expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 }
        }
      }
    ]
  },
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
  manifest: {
    name: 'Calistenia 28 Dias',
    short_name: 'Calistenia',
    description: 'Treinos Diários de Calistenia 28 Dias - 100% Offline',
    start_url: '/',
    display: 'standalone',
    background_color: '#090d16',
    theme_color: '#090d16',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  }
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA(pwaOptions)
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      host: '127.0.0.1',
      port: 3000
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  }
});
