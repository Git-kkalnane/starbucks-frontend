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
            // TODO: 서버 개발 후 로직 변경 예정 (임시로 notion API사용)
            proxy: {
                '/api': {
                    target: 'https://api.notion.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                    headers: {
                        Authorization: `Bearer ${env.VITE_NOTION_API_KEY}`,
                        'Notion-Version': '2022-06-28',
                    },
                },
            },
        },
    };
});
