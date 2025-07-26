import { Quote } from './quote.type';

export type QuoteResponse = {
  success: boolean
  data?: Quote
  error?: string
};
