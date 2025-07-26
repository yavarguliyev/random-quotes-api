import { QuoteService } from '../../services/quote.service';

export const quoteResolvers = (quoteService: QuoteService) => ({
  Query: {
    randomQuote: async () => {
      return await quoteService.getRandomQuote();
    }
  },

  Mutation: {
    likeQuote: async (_: unknown, { id }: { id: string }) => {
      return await quoteService.likeQuote(id);
    }
  }
});
