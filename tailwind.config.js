module.exports = {
  content: ['./packages/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        h5: '16px',
        h4: '18px',
        h3: '20px',
        h2: '24px',
        h1: '28px',
      },
      colors: ({ theme }) => ({
        primary: theme.colors.sky[500],
        danger: theme.colors.red[500],
      }),
      keyframes: {
        'modal-enter': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'modal-leave': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        'modal-enter': 'modal-enter .2s ease-out',
        'modal-leave': 'modal-leave .2s ease-in',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
