/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'primary-bg': '#0a0a0f',
        'secondary-bg': '#1a1a2e',
        'tertiary-bg': '#1e293b',
        'surface': '#1e40af',
        'surface-hover': '#3b82f6',
        'accent-primary': '#22d3ee',
        'accent-secondary': '#a855f7',
        'accent-tertiary': '#fbbf24',
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
        'glow-primary': '0 0 30px rgba(34, 211, 238, 0.4)',
        'glow-secondary': '0 0 30px rgba(168, 85, 247, 0.4)',
        'glow-success': '0 0 30px rgba(34, 197, 94, 0.4)',
        'glow-warning': '0 0 30px rgba(251, 191, 36, 0.4)',
        'glow-error': '0 0 30px rgba(248, 113, 113, 0.4)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};