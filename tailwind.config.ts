import type { Config } from 'tailwindcss'
import { PluginCreator } from 'tailwindcss/types/config';

type FontAttributes = Partial<HTMLParagraphElement['style']>;

const makeTypeSet = (name: string, ...sets: [FontAttributes, ...{ screen: string, attributes: FontAttributes }[]][]): PluginCreator =>
  ({ addUtilities }) => {
    addUtilities(
      sets.reduce((set, [baseAttributes, ...attributes], index) => Object.assign(set, {
        [`.type-${name}${sets.length > 1 ? `-${index + 1}` : ''}`]: attributes.reduce((all, { screen, attributes: attributesForScreen }) => Object.assign(all, {
          [`@screen ${screen}`]: attributesForScreen
        }), baseAttributes)
      }
      ), {}))
  }

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'mplus': ['M PLUS Rounded 1c', 'sans-serif'],
        'poltawski': ['Poltawski Nowy', 'serif'],
      },
      keyframes: {
        'scroll-rtl': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'scroll-rtl-2': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-200%)' },
        }
      },
      animation: {
        'news-ticker': 'scroll-rtl 80s -80s linear infinite',
        'news-ticker-2': 'scroll-rtl-2 80s -40s linear infinite',
      }
    },
  },
  plugins: [
    makeTypeSet('headline', [{ fontFamily: ['Poltawski Nowy', 'serif'].join(' '), fontSize: '38px' }]),
    makeTypeSet(
      'body',
      [{ 'fontFamily': ['M PLUS Rounded 1c', 'sans-serif'].join(' '), fontSize: '28px' }],
      [{ 'fontFamily': ['M PLUS Rounded 1c', 'sans-serif'].join(' '), fontSize: '22px' }],
      [{ 'fontFamily': ['M PLUS Rounded 1c', 'sans-serif'].join(' '), fontSize: '14px' }],
    ),
    makeTypeSet(
      'chip',
      [{ 'fontFamily': ['M PLUS Rounded 1c', 'sans-serif'].join(' '), fontSize: '9px', fontWeight: '700' }],
    ),
  ],
}
export default config
