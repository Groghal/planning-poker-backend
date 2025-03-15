import express, { Application } from 'express';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swaggerConfig';
import cors from 'cors';
import routes from './src/routes';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const server: http.Server = http.createServer(app);
const PORT: number = Number(process.env.PORT) || 3222;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use routes
app.use('/', routes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;
