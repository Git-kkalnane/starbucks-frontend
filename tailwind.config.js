/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Pretendard', 'sans-serif'],
            },
            colors: {
                'bg-app': '#f6f5ef', // 배경색
                'starbucks-green': '#01A862',
                'able-string': '#48b77a',
                'main-button': '#686868',
                'disabled-string': '#8b8b8b',
                deactivation: '#e0e0e0',
            },
        },
    },
    plugins: [],
};
