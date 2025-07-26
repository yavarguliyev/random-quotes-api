import axios from 'axios';

import { getErrorMessage } from '../utils/utility-functions.util';
import { QuotableQuoteSchema } from '../value-objects/validation-schemas';
import { Quote, QuoteResponse } from '../value-objects/types';

export class QuoteService {
  private quotes: Map<string, Quote> = new Map();

  async getRandomQuote (): Promise<QuoteResponse> {
    try {
      const response = await axios.get(`${process.env.QUOTES_API_RANDOM_URL}`);
      const data = QuotableQuoteSchema.parse(response.data);

      const quote: Quote = {
        id: data._id,
        content: data.content,
        author: data.author,
        tags: data.tags,
        likes: 0,
        createdAt: new Date()
      };

      this.quotes.set(quote.id, quote);
      return { success: true, data: quote };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    }
  }

  likeQuote (quoteId: string): QuoteResponse {
    try {
      const quote = this.quotes.get(quoteId);
      if (!quote) {
        return { success: false, error: 'Quote not found' };
      }

      quote.likes += 1;
      this.quotes.set(quoteId, quote);

      return { success: true, data: quote };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    }
  }
}