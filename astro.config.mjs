// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://omarcreatives.com',
  output: 'static',
  adapter: netlify(),
  integrations: [mdx(), sitemap(), preact()],
});