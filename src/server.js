import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pinoHTTP from 'pino-http';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT);
const pino = pinoHTTP({
  transport: {
    target: 'pino-pretty',
  },
});

const setupServer = () => {
  app.use(cors());
  app.use(pino);
  app.get('/', (req, res) => {
    res.send('hello');
  });
  app.use('*', (req, res) => {
    res.status(404).send({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

export { setupServer };
