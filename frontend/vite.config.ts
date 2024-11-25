import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@components': resolve(__dirname, 'src/components'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@constants': resolve(__dirname, 'src/constants'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@hooks': resolve(__dirname, 'src/hooks'),
        },
    },
});
