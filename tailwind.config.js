/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070c1d',
          900: '#0b132b',
          850: '#141d38',
          800: '#1c2541',
          700: '#263459',
        },
        skycraft: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
        },
        amberlight: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Figtree', 'sans-serif'],
      },
      boxShadow: {
        'clean': '0 4px 20px -2px rgba(11, 19, 43, 0.08), 0 2px 6px -1px rgba(11, 19, 43, 0.04)',
        'clean-hover': '0 12px 30px -4px rgba(11, 19, 43, 0.12), 0 4px 10px -2px rgba(11, 19, 43, 0.06)',
        'water': '0 8px 30px rgba(2, 132, 199, 0.15)',
      }
    },
  },
  plugins: [],
}
