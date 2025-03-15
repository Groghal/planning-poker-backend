export default {
  openapi: '3.0.0',
  info: {
    title: 'Planning Poker API',
    version: '1.0.0',
    description: 'API documentation for the Planning Poker application'
  },
  servers: [
    {
      url: 'http://localhost:3222/api',
      description: 'Development server'
    }
  ],
  components: {
    schemas: {
      Room: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          users: {
            type: 'object',
            additionalProperties: {
              $ref: '#/components/schemas/User'
            }
          },
          votes: {
            type: 'object',
            additionalProperties: { type: 'string' }
          },
          showVotes: { type: 'boolean' },
          host: { type: 'string' },
          voteOptions: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          username: { type: 'string' },
          vote: {
            type: ['string', 'null']
          }
        }
      }
    }
  }
}; 