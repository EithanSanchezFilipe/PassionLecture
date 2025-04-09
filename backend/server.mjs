import https from 'https';
import path from 'path';
import fs from 'fs';
import { createServer } from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import sequelize from './db/sequelize.mjs';
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

const privateKey = fs.readFileSync(
  path.resolve('certificates/server.key'),
  'utf8'
);
// Import SSL certificate
const sslcert = {
  key: privateKey,
  cert: fs.readFileSync(path.resolve('certificates/server.crt'), 'utf8'),
};

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

const httpsServer = https.createServer(sslcert, app);

app.listen(3000, () => {
  console.log('Server running on port https://localhost:443');
});
export { privateKey };
