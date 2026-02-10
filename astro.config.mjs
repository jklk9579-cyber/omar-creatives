// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	output: 'static',
	image: {
		service: { entrypoint: 'astro/assets/services/sharp' },
	},
	integrations: [mdx(), sitemap()],
});
