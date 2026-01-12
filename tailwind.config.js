/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DFAM風のカスタムカラー定義が必要ならここに追加
      }
    },
  },
  plugins: [],
}
