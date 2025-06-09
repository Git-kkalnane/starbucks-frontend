/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
        "bg-app": "#f6f5ef", // 배경색
        "starbucks-green": "#007240",
      },
    },
  },
  plugins: [],
};
