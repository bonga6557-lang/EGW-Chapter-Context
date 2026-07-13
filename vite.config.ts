/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalized = id.replace(/\\/g, '/');
            const gcMatch = normalized.match(/\/src\/data\/gc-(\d+)\.ts$/);
            if (gcMatch) {
              const bucket = Math.ceil(Number(gcMatch[1]) / 10);
              return `great-controversy-${bucket}`;
            }
            if (normalized.includes('/node_modules/@supabase/')) return 'supabase';
            if (normalized.includes('/node_modules/lucide-react/')) return 'icons';
            if (
              normalized.includes('/node_modules/motion/') ||
              normalized.includes('/node_modules/framer-motion/') ||
              normalized.includes('/node_modules/motion-dom/')
            ) {
              return 'motion';
            }
            if (
              normalized.includes('/node_modules/react/') ||
              normalized.includes('/node_modules/react-dom/') ||
              normalized.includes('/node_modules/scheduler/')
            ) {
              return 'react';
            }
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'tests/**/*.test.ts'],
    },
  };
});
