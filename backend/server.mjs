import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.mjs';
import cors from 'cors';

// Create app
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// Import routes
import userRoute from './routes/user.mjs';
import bookRoute from './routes/book.mjs';
import categoryRoute from './routes/category.mjs';
import authorRoute from './routes/author.mjs';
import editorRoute from './routes/editor.mjs';
import searchRoute from './routes/search.mjs';
// Routes
app.use('/api/user', userRoute);
app.use('/api/book', bookRoute);
app.use('/api/category', categoryRoute);
app.use('/api/author', authorRoute);
app.use('/api/editor', editorRoute);
app.use('/api/search', searchRoute);

app.listen(443, () => {
  console.log('Server running on port http://localhost:443');
}); 