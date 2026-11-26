/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        toss: {
          blue: '#3182F6',
          blueHover: '#1B64DA',
          blueLight: '#E8F3FF',
          bg: '#F2F4F6',
          surface: '#FFFFFF',
          text: '#191F28',
          subtext: '#4E5968',
          muted: '#8B95A1',
          border: '#E5E8EB',
          divider: '#F2F4F6',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 2px 12px rgba(25, 31, 40, 0.04)',
        cardHover: '0 10px 28px rgba(25, 31, 40, 0.09)',
        device: '0 24px 60px rgba(25, 31, 40, 0.14)',
        fab: '0 6px 18px rgba(49, 130, 246, 0.35)',
      },
    },
  },
  plugins: [],
};
