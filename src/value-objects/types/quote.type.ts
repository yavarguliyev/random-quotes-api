import z from 'zod';

import { QuoteSchema } from '../schemas/quote.schema';

export type Quote = z.infer<typeof QuoteSchema>;
