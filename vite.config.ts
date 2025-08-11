import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const dotenv = require('dotenv');

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), nodePolyfills()],
    base: '/tgbh/',
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    },
    server: {
        host: true, // нужно для Cloudflare/Ngrok
        allowedHosts: true, // 💥 ключевая строка: разрешить любые хосты
    },
});
