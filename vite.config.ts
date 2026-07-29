/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
    },
    // admin 5173/4173 da turadi — vendor bilan to'qnashmasligi uchun 5174/4174
    server: { open: true, port: 5174 },
    preview: { host: '0.0.0.0', port: 4174, strictPort: true, cors: true },
    resolve: {
        alias: {
            '~api': path.resolve(__dirname, 'src/api'),
            '~assets': path.resolve(__dirname, 'src/assets'),
            '~components': path.resolve(__dirname, 'src/components'),
            '~constants': path.resolve(__dirname, 'src/constants'),
            '~context': path.resolve(__dirname, 'src/context'),
            '~hooks': path.resolve(__dirname, 'src/hooks'),
            '~i18n': path.resolve(__dirname, 'src/i18n'),
            '~pages': path.resolve(__dirname, 'src/pages'),
            '~services': path.resolve(__dirname, 'src/services'),
            '~styles': path.resolve(__dirname, 'src/styles'),
            '~theme': path.resolve(__dirname, 'src/theme'),
            '~types': path.resolve(__dirname, 'src/types'),
            '~utils': path.resolve(__dirname, 'src/utils'),
        },
    },
});
