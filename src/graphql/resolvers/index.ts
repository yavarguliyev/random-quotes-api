import { quoteResolvers } from './quote.resolver';
import { QuoteService } from '../../services/quote.service';

const quoteService = new QuoteService();
const generatedResolvers = quoteResolvers(quoteService);

const resolvers = {
  Query: {
    ...generatedResolvers.Query
  },
  Mutation: {
    ...generatedResolvers.Mutation
  }
};

export default resolvers;
