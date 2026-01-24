// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

const nodeEnv = process.env.NODE_ENV ?? 'development';

export default defineConfig({
  site: 'https://www.example.com', // update per deployment
  integrations: [react()],
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'de',
    locales: ['en', 'de'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    },
  },
});
