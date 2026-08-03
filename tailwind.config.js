/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'Consolas', 'monospace'],
      },
      colors: {
        classic: {
          blue: 'var(--classic-blue)',
          green: 'var(--classic-green)',
          orange: 'var(--classic-orange)',
          pink: 'var(--classic-pink)',
          purple: 'var(--classic-purple)',
          yellow: 'var(--classic-yellow)',
          red: 'var(--classic-red)',
        },
        leaf: {
          50: '#eff8ff',
          100: '#dcebff',
          200: '#bcf4ff',
          300: '#73deff',
          400: '#38bdf8',
          500: '#0088ff',
          600: '#0066cc',
          700: '#0052a3',
          800: '#003d7a',
          900: '#002952',
        },
      },
    },
  },
  plugins: [],
}
