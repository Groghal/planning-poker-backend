export default {
  openapi: '3.0.0',
  info: {
    title: 'Planning Poker API',
    version: '1.0.0',
    description: 'API documentation for the Planning Poker application'
  },
  servers: [
    {
      url: '/api',
      description: 'Development server'
    }
  ],
  paths: {
    '/rooms': {
      post: {
        summary: 'Create a new room',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  roomId: { type: 'string', description: 'Custom room ID (optional)' },
                  voteOptions: { 
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Custom vote options (optional)'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Room created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    roomId: { type: 'string' },
                    voteOptions: { 
                      type: 'array',
                      items: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/rooms/{roomId}': {
      get: {
        summary: 'Get room information',
        parameters: [
          {
            name: 'roomId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Room information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Room'
                }
              }
            }
          }
        }
      },
      delete: {
        summary: 'Delete a room',
        parameters: [
          {
            name: 'roomId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Room deleted successfully'
          }
        }
      }
    },
    '/rooms/{roomId}/join': {
      post: {
        summary: 'Join a room',
        parameters: [
          {
            name: 'roomId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Successfully joined the room',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    userId: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/rooms/{roomId}/vote': {
      post: {
        summary: 'Submit a vote',
        parameters: [
          {
            name: 'roomId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  vote: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Vote recorded successfully'
          }
        }
      }
    },
    '/rooms/{roomId}/vote-options': {
      get: {
        summary: 'Get room vote options',
        parameters: [
          {
            name: 'roomId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Vote options retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { type: 'string' }
                }
              }
            }
          }
        }
      }
    },
    '/rooms/{roomId}/reveal': {
      post: {
        summary: 'Reveal all votes',
        parameters: [
          {
            name: 'roomId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Votes revealed successfully'
          }
        }
      }
    },
    '/rooms/{roomId}/reset': {
      post: {
        summary: 'Reset the voting round',
        parameters: [
          {
            name: 'roomId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Round reset successfully'
          }
        }
      }
    },
    '/health': {
      get: {
        summary: 'Health check endpoint',
        responses: {
          '200': {
            description: 'Service is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
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