import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
const PORT = process.env.PORT || 3222;
const API_BASE_PATH = process.env.API_BASE_PATH || '/api';

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(API_BASE_PATH, routes);

// Swagger documentation
app.use(`${API_BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    deepLinking: true,
    defaultModelsExpandDepth: -1,
    defaultModelExpandDepth: 1,
    defaultModelRendering: 'model',
    displayOperationId: true,
    docExpansion: 'none',
    showExtensions: true,
    showCommonExtensions: true,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'options', 'head', 'patch', 'trace'],
    tryItOutEnabled: true,
    syntaxHighlight: {
      theme: 'monokai'
    }
  }
}));

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}${API_BASE_PATH}/docs`);
});