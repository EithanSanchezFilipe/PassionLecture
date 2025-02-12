import https from 'https';
import path from 'path';
import fs from 'fs';
import { createServer } from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import sequelize from './db/sequelize.mjs';

// Create app
const app = express();
app.use(express.json());
app.use(cookieParser());

const privateKey = fs.readFileSync(path.resolve('privkey.key'), 'utf8');
// Import SSL certificate
const sslcert = {
  key: privateKey,
  cert: fs.readFileSync(path.resolve('cerificate.crt'), 'utf8'),
};

// Import routes
import userRoute from './routes/user.mjs';
import bookRoute from './routes/book.mjs';
// import authorRoute from './routes/author.mjs';

// Routes
app.use('/user', userRoute);
app.use('/book', bookRoute);
// app.use('/author', authorRoute);

const httpsServer = https.createServer(sslcert, app);

httpsServer.listen(8080, () => {
  console.log('Server running on port https://localhost:8080');
});
export { privateKey };
