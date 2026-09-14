/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070D',
          900: '#080B14',
          850: '#0B0F1C',
          800: '#0F1424',
          700: '#161C31',
          600: '#212942',
        },
        mist: {
          100: '#F5F7FF',
          300: '#C7CCE0',
          500: '#8B93A7',
          700: '#5A6178',
        },
        signal: {
          blue: '#4C6FFF',
          indigo: '#6D5BFF',
          violet: '#9B5BFF',
          gold: '#E8B95F',
          mint: '#3FCF9E',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'aurora': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(76,111,255,0.25), transparent), radial-gradient(ellipse 60% 40% at 90% 10%, rgba(155,91,255,0.18), transparent)',
        'grain-gradient': 'linear-gradient(180deg, #05070D 0%, #080B14 50%, #05070D 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.45)',
        'glow-blue': '0 0 40px rgba(76,111,255,0.25)',
        'glow-violet': '0 0 40px rgba(155,91,255,0.2)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-16px,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        drift: 'drift 7s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
