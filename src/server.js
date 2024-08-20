import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pinoHTTP from 'pino-http';
import cookieParser from 'cookie-parser';
import contactRouters from './routers/contacts.js';
import authRouters from './routers/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { authenticate } from './middlewares/authenticate.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const pino = pinoHTTP({
  transport: {
    target: 'pino-pretty',
  },
});

const setupServer = () => {
  app.use(cors());
  app.use(pino);
  app.use(cookieParser());
  app.use('/contacts', authenticate, contactRouters);
  app.use('/auth', authRouters);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

export { setupServer };
