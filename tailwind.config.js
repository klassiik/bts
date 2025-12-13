/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Charcoal backgrounds
        charcoal: {
          50: '#f5f5f6',
          100: '#e6e6e7',
          200: '#cfcfd1',
          300: '#adaeb1',
          400: '#84858a',
          500: '#696a6f',
          600: '#58595d',
          700: '#4a4b4f',
          800: '#3d3e41',
          900: '#2b2c2e',
          950: '#1a1b1c',
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
  plugins: [heroui({
    themes: {
      dark: {
        colors: {
          background: "#1a1b1c",
          foreground: "#e6e6e7",
          primary: {
            50: "#f0fdf5",
            100: "#dcfce8",
            200: "#bbf7d1",
            300: "#86efad",
            400: "#4ade80",
            500: "#22c55e",
            600: "#16a34a",
            700: "#15803d",
            800: "#166534",
            900: "#14532d",
            DEFAULT: "#16a34a",
            foreground: "#ffffff",
          },
          focus: "#16a34a",
        },
      },
    },
  })],
};
