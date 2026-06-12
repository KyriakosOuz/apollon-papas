/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        text: 'var(--text)',
        'text-dim': 'var(--text-dim)',
        'text-faint': 'var(--text-faint)',
        gold: 'var(--gold)',
        'gold-soft': 'var(--gold-soft)',
        'aurora-gold': 'var(--aurora-gold)',
        'aurora-orange': 'var(--aurora-orange)',
        'aurora-magenta': 'var(--aurora-magenta)',
        'aurora-blue': 'var(--aurora-blue)',
        'aurora-teal': 'var(--aurora-teal)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        strong: 'var(--border-strong)',
      },
      borderRadius: {
        card: 'var(--r-card)',
        input: 'var(--r-input)',
        chip: 'var(--r-chip)',
        pill: 'var(--r-pill)',
      },
      fontFamily: {
        display: ['Manrope Variable', 'Inter Variable', 'system-ui', 'sans-serif'],
        body: ['Inter Variable', 'system-ui', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
