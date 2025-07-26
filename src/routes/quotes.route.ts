import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { QuoteService } from '../services/quote.service';

export async function quotesRoutes (fastify: FastifyInstance, options: { quoteService: QuoteService }) {
  const { quoteService } = options;

  fastify.get('/api/quotes/random', async (_: FastifyRequest, reply: FastifyReply) => {
    const result = await quoteService.getRandomQuote();
    if (!result.success) reply.status(500);
    return result;
  });

  fastify.post<{ Params: { id: string } }>('/api/quotes/:id/like', async (request, reply) => {
    const result = quoteService.likeQuote(request.params.id);
    if (!result.success) reply.status(result.error === 'Quote not found' ? 404 : 500);
    return result;
  });
}
