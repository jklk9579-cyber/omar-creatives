import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const services = defineCollection({
	loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		icon: z.string().optional(),
		price: z.string().optional(),
		order: z.number().default(0),
		featured: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		title_ar: z.string().optional(),
		description: z.string(),
		description_ar: z.string().optional(),
		date: z.coerce.date(),
		cover: z.string(),
		gallery: z.array(z.string()).optional(),
		category: z.string(),
		category_ar: z.string().optional(),
		client: z.string().optional(),
		client_ar: z.string().optional(),
		link: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { blog, services, projects };
