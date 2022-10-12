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
        primary: { ...theme.colors.sky, DEFAULT: theme.colors.sky[500] },
        danger: { ...theme.colors.red, DEFAULT: theme.colors.red[500] },
        success: { ...theme.colors.green, DEFAULT: theme.colors.green[500] },
      }),
      keyframes: {
        'drawer-enter': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'drawer-leave': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
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
        'drawer-enter': 'drawer-enter .2s ease-in-out',
        'drawer-leave': 'drawer-leave .2s ease-in-out',
        'modal-enter': 'modal-enter .2s ease-out',
        'modal-leave': 'modal-leave .2s ease-in',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
