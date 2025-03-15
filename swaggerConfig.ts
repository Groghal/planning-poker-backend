import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Planning Poker API',
      version: '1.0.0',
      description: 'API documentation for the Planning Poker application',
    },
    servers: [
      {
        url: 'http://localhost:3222',
        description: 'Development server',
      }
    ],
  },
  apis: [
    path.resolve(__dirname, './src/routes/*.ts')
  ], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(options);

export default swaggerDocs; 