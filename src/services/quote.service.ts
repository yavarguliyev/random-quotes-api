import axios from 'axios';
import path from 'path';
import os from 'os';

import { getErrorMessage, runWorker } from '../utils/utility-functions.util';
import { QuotableQuoteSchema } from '../value-objects/validation-schemas';
import { Quote, QuoteResponse } from '../value-objects/types';
import { logger } from '../utils/logger.util';

export class QuoteService {
  private quotes: Map<string, Quote> = new Map();
  private LIMIT = 2e9;
  private NUM_WORKERS = os.cpus().length / 4;

  async getRandomQuote (): Promise<QuoteResponse> {
    const start = performance.now();

    const CHUNK_SIZE = Math.floor(this.LIMIT / this.NUM_WORKERS);

    try {
      const workerPath = path.resolve(process.env.WORKER_PATH!);
      
      await Promise.all(
        // Create an array with NUM_WORKERS elements (e.g., n)
        Array.from({ length: this.NUM_WORKERS }).map((_, i) => {
          // Calculate the start index of the chunk for worker 'i'
          const start = i * CHUNK_SIZE;

          // Calculate the end index of the chunk for worker 'i'
          // For the last worker, make sure it goes up to LIMIT (to cover any remainder)
          const end = i === this.NUM_WORKERS - 1 ? this.LIMIT : (i + 1) * CHUNK_SIZE;

          // Launch a worker thread, passing the start and end to process that chunk
          // runWorker returns a Promise that resolves when the worker finishes
          return runWorker<number>(workerPath, { start, end });
        })
      );

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
    } finally {
      const end = performance.now();
      logger.info(`getRandomQuote Execution Time: ${(end - start).toFixed(2)} ms`);
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
