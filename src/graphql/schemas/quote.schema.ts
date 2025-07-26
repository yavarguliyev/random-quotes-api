export const quoteSchema = `
  type Quote {
    id: ID!
    content: String!
    author: String!
    tags: [String!]!
    likes: Int!
    createdAt: String!
  }

  type QuoteResponse {
    success: Boolean!
    data: Quote
    error: String
  }

  type Query {
    randomQuote: QuoteResponse!
  }

  type Mutation {
    likeQuote(id: ID!): QuoteResponse!
  }
`;
