import z from 'zod';

import { QuoteSchema } from '../validation-schemas/quote.schema';

export type Quote = z.infer<typeof QuoteSchema>;
