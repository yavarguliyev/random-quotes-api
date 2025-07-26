# Quote Service

A production-ready quote service built with Fastify, TypeScript, and GraphQL that provides both REST and GraphQL APIs for fetching and interacting with random quotes.

## Features

- 🎯 **Dual API Support**: Both REST and GraphQL endpoints
- 🎲 **Random Quotes**: Fetches quotes from external API (quotable.io)
- 👍 **Like System**: Users can like quotes with persistent counters
- 🏥 **Health Monitoring**: Built-in health check endpoint
- 📊 **GraphQL Playground**: Interactive GraphQL interface
- 🔍 **Type Safety**: Full TypeScript implementation with Zod validation
- 📝 **Structured Logging**: Winston-based logging system

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify
- **GraphQL**: Mercurius
- **Validation**: Zod
- **HTTP Client**: Axios
- **Logging**: Winston
- **Code Quality**: ESLint

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd quote-service

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

```env
PORT=3000
HOST=localhost
NODE_ENV=development
QUOTES_API_RANDOM_URL=https://api.quotable.io/random
LOG_LEVEL=info
```

## API Documentation

### REST API

#### Get Random Quote
```http
GET /api/quote/random
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "content": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs",
    "tags": ["inspirational", "work"],
    "likes": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Like a Quote
```http
POST /api/quote/:id/like
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "content": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs",
    "tags": ["inspirational", "work"],
    "likes": 1,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GraphQL API

Access the GraphQL Playground at `http://localhost:3000/graphiql`

#### Queries

**Get Random Quote:**
```graphql
query {
  randomQuote {
    success
    data {
      id
      content
      author
      tags
      likes
      createdAt
    }
    error
  }
}
```

#### Mutations

**Like a Quote:**
```graphql
mutation {
  likeQuote(id: "abc123") {
    success
    data {
      id
      content
      author
      tags
      likes
      createdAt
    }
    error
  }
}
```

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "version": "1.0.0"
}
```

## Development

```bash
# Development with hot reload
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── index.ts                # Application entry point
├── graphql/                # GraphQL resolvers/schemas
├── routes/                 # REST API routes
├── services/               # Business logic layer
├── utils/                  # Utility functions
└── value-objects/          # Types and validation schemas
    ├── validation-schemas/ # Zod validation schemas
    └── types/              # TypeScript type definitions
```

## License

MIT License - see LICENSE file for details.