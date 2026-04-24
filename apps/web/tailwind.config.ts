import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      bg: '#0B1020', elev: '#111827', text: '#E5E7EB',
      primary: '#3B82F6', secondary: '#84CC16', accent: '#FB7185',
      muted: '#94A3B8', success: '#22C55E', warning: '#F59E0B', danger: '#EF4444'
    }
  } },
  plugins: []
} satisfies Config;
