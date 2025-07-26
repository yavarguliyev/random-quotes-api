import { z } from 'zod';

// External API response schemas
export const QuotableQuoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  authorSlug: z.string(),
  length: z.number(),
  dateAdded: z.string(),
  dateModified: z.string()
});

// Internal quote schema
export const QuoteSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: z.string(),
  tags: z.array(z.string()).default([]),
  likes: z.number().default(0),
  createdAt: z.date().default(() => new Date())
});
