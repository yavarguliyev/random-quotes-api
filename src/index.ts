import Fastify from 'fastify';
import mercurius from 'mercurius';
import dotenv from 'dotenv';

import resolvers from './graphql/resolvers';
import routes from './routes';
import schema from './graphql/schemas';
import { services } from './services';
import { logger } from './utils/logger.util';
import { getErrorMessage } from './utils/utility-functions.util';

dotenv.config();

const fastify = Fastify({ logger: false });

async function buildServer () {
  await fastify.register(mercurius, { schema, resolvers, graphiql: true });
  await routes(fastify, services);

  fastify.get('/health', async () => {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    };
  });

  fastify.get('/', async () => {
    return {
      message: 'Quote Service API',
      version: '1.0.0',
      endpoints: {
        rest: {
          'GET /api/quotes/random': 'Get a random quote',
          'POST /api/quotes/:id/like': 'Like a quote'
        },
        graphql: {
          playground: '/graphiql',
          queries: [
            'randomQuote'
          ],
          mutations: [
            'likeQuote(id: String!)'
          ]
        },
        health: '/health'
      },
      features: [
        'Random quote fetching from multiple sources',
        'Quote liking system'
      ]
    };
  });

  return fastify;
}

async function start() {
  try {
    const server = await buildServer();
    const port = parseInt(process.env.PORT!);
    const host = process.env.HOST;

    await server.listen({ port, host });

    logger.info(`🚀 Quote Service running at http://${host}:${port}`);
    logger.info(`📊 GraphQL Playground available at http://${host}:${port}/graphiql`);
    logger.info(`🏥 Health check at http://${host}:${port}/health`);
  } catch (error) {
    logger.error('Error starting server:', getErrorMessage(error));

    process.exit(1);
  }
}

start();
