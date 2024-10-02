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
        'c-blue': '#007bff',
        'c-indigo': '#6610f2',
        'c-purple': '#6f42c1',
        'c-pink': '#e83e8c',
        'c-red': '#dc3545',
        'c-orange': '#fd7e14',
        'c-yellow': '#ffc107',
        'c-green': '#28a745',
        'c-teal': '#20c997',
        'c-cyan': '#17a2b8',
        'c-white': '#fff',
        'c-gray': '#6c757d',
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
