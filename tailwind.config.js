/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Charcoal backgrounds - improved contrast for accessibility
        charcoal: {
          50: '#ffffff',
          100: '#f5f5f6',
          200: '#e0e0e2',
          300: '#c0c0c3',
          400: '#9a9a9f',
          500: '#7a7a80',
          600: '#5a5a60',
          700: '#4a4a50',
          800: '#3a3a40',
          900: '#2a2a30',
          950: '#1a1a20',
        },
        // Evergreen primary
        evergreen: {
          50: '#f0fdf5',
          100: '#dcfce8',
          200: '#bbf7d1',
          300: '#86efad',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Complementary colors
        sage: {
          50: '#f6f7f6',
          100: '#e3e6e3',
          200: '#c7cdc7',
          300: '#a3ada3',
          400: '#7d8a7d',
          500: '#627062',
          600: '#4d594d',
          700: '#3f483f',
          800: '#353b35',
          900: '#2d322d',
          950: '#181b18',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        }
      }
    }
  },
  darkMode: "class",
  plugins: [],
};
