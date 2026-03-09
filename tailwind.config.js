/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'var(--color-primary-blue)',
        'accent-gold': 'var(--color-accent-gold)',
        'font-red': 'var(--color-font-red)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-light': 'var(--color-bg-light)',
        'text-primary': 'var(--color-text-primary)',
        'text-muted': 'var(--color-text-muted)',
        'banner-night': 'var(--color-banner-night)',
        'banner-night-soft': 'var(--color-banner-night-soft)',
        'blue-led': 'var(--color-blue-led)',
        'blue-glow': 'var(--color-blue-glow)',
        'section-light': 'var(--color-section-light)',
        'section-dark': 'var(--color-section-dark)',
        'section-rooms': 'var(--color-section-rooms)',
        'footer-bg': 'var(--color-footer)',
        'whatsapp-teal': 'var(--color-whatsapp-teal)',
        'highlight-card': 'var(--color-highlight-card)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
