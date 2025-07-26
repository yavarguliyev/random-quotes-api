import { FastifyInstance } from 'fastify';

import { quotesRoutes } from './quotes.route';
import { Services } from '../value-objects/types';

async function registerRoutes (fastify: FastifyInstance, services: Services) {
  await fastify.register(quotesRoutes, { quoteService: services.quoteService });
}

export default registerRoutes;
