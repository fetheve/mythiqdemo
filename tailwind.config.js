/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'primary-bg': '#0f0f23',
        'secondary-bg': '#1a1a2e',
        'tertiary-bg': '#16213e',
        'surface': '#0f3460',
        'surface-hover': '#1e4976',
        'accent-primary': '#00d4ff',
        'accent-secondary': '#7c3aed',
        'accent-tertiary': '#f59e0b',
      },
      animation: {
        'gradient-shift': 'gradientShift 20s ease infinite',
        'grid-pulse': 'gridPulse 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'floating': 'floating 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'skeleton': 'skeleton 1.5s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(0, 212, 255, 0.3)',
        'glow-secondary': '0 0 30px rgba(124, 58, 237, 0.3)',
        'glow-success': '0 0 30px rgba(16, 185, 129, 0.3)',
        'glow-warning': '0 0 30px rgba(245, 158, 11, 0.3)',
        'glow-error': '0 0 30px rgba(239, 68, 68, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};