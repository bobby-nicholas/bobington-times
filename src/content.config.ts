import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    section: z.enum(['news', 'international', 'sports', 'arts', 'opinion']),
    date: z.coerce.date(),
    author: z.string(),
    authorTitle: z.string().optional(),
    summary: z.string(),
    image: z.string().optional(),
    imageCaption: z.string().optional(),
    featured: z.boolean().default(false),
    edition: z.string().optional(),
  }),
});

export const collections = { articles };
