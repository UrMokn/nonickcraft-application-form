import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(avatar|button|card|dropdown|image|input|navbar|spinner|user|ripple|menu|divider|popover).js',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
