import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
    const primary_url = process.env.DDEV_PRIMARY_URL_WITHOUT_PORT || 'http://localhost';
    const origin = primary_url.replace(/:\d+$/, "") + `:5173`;
    return {
        server: {
            host: "0.0.0.0",
            port: 5173,
            strictPort: true,
            origin: origin,
            cors: {
                origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,
            },
            watch: {
                usePolling: true, // Enable polling for file changes
            }
        },
        alias: {
            alias: [{find: '@', replacement: './src'}],
        },
        // base: (command === 'build') ? '/_resources/themes/mytheme/dist/' : '/', // TODO: .env variable, only on build
        base: './',
        // publicDir: '../../public',
        build: {
            // cssCodeSplit: false,
            outDir: './dist',
            manifest: true,
            sourcemap: true,
            rollupOptions: {
                input: {
                    'main.js': './src/javascript/index.js',
                    'main.css': './src/css/app.css',
                    'editor.css': './src/css/editor.css',
                },
            },
        },
        css: {
            devSourcemap: true,
        },
        plugins: [
            tailwindcss(),
        ]
    }
})