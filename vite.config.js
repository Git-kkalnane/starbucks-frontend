import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    // 환경 변수 로드
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react(), svgr()],
        server: {
            port: 5173,
            // TODO: 서버 개발 후 로직 변경 예정 (임시로 notion API사용)
            proxy: {
                '/api/shops': {
                    target: 'https://api.notion.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api\/shops/, ''),
                    headers: {
                        Authorization: `Bearer ${env.SHOPS_NOTION_API_KEY}`,
                        'Notion-Version': '2022-06-28',
                    },
                },
                '/api/drinks': {
                    target: 'https://api.notion.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api\/drinks/, ''),
                    headers: {
                        Authorization: `Bearer ${env.DRINKS_NOTION_API_KEY}`,
                        'Notion-Version': '2022-06-28',
                    },
                },
                '/api/desserts': {
                    target: 'https://api.notion.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api\/desserts/, ''),
                    headers: {
                        Authorization: `Bearer ${env.DESSERTS_NOTION_API_KEY}`,
                        'Notion-Version': '2022-06-28',
                    },
                },
            },
        },
    };
});
