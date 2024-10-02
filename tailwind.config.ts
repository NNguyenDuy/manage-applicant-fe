import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#007bff',
        indigo: '#6610f2',
        purple: '#6f42c1',
        pink: '#e83e8c',
        red: '#dc3545',
        orange: '#fd7e14',
        yellow: '#ffc107',
        green: '#28a745',
        teal: '#20c997',
        cyan: '#17a2b8',
        white: '#fff',
        gray: '#6c757d',
        'gray-dark': '#343a40',
        primary: '#00b14f',
        success: '#28a745',
        info: '#17a2b8',
        warning: '#ffc107',
        danger: '#da4538',
        light: '#f8f9fa',
        dark: '#343a40',
        'primary-light': '#9cf8be',
      },
    },
  },
  plugins: [],
}

export default config
