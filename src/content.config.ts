import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			title_ar: z.string().optional(),
			description: z.string(),
			description_ar: z.string().optional(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// Accept both local asset images and CMS-uploaded string paths
			heroImage: z.union([image(), z.string()]).optional(),
			tags: z.array(z.string()).optional(),
		}),
});

const services = defineCollection({
	loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		title_ar: z.string().optional(),
		description: z.string(),
		description_ar: z.string().optional(),
		image: z.string().optional(),
		icon: z.string().optional(),
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
		video_url: z.string().optional(),
		featured: z.boolean().default(false),
		tags: z.array(z.string()).optional(),
		// Enterprise Case Study Specific Fields
		isCaseStudy: z.boolean().optional(),
		timeline: z.string().optional(),
		role: z.string().optional(),
		role_ar: z.string().optional(),
		metrics: z.array(z.object({
			value: z.string(),
			label: z.string(),
			label_ar: z.string().optional(),
			icon: z.string().optional(),
		})).optional(),
		challenge: z.string().optional(),
		challenge_ar: z.string().optional(),
		solution: z.string().optional(),
		solution_ar: z.string().optional(),
		impact: z.string().optional(),
		impact_ar: z.string().optional(),
		testimonial: z.object({
			quote: z.string(),
			quote_ar: z.string().optional(),
			author: z.string(),
			role: z.string(),
			avatar: z.string().optional(),
		}).optional(),
		beforeAfter: z.object({
			beforeImg: z.string(),
			afterImg: z.string(),
			beforeLabel: z.string().optional(),
			afterLabel: z.string().optional(),
		}).optional(),
	}),
});

export const collections = { blog, services, projects };
