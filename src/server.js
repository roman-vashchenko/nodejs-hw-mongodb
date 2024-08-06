import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pinoHTTP from 'pino-http';
import routerContacts from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

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
  app.use('/contacts', routerContacts);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

export { setupServer };
