import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pinoHTTP from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';

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
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.send({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 500, message: 'Internal Server Error' });
    }
  });

  app.get('/contacts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await getContactById(id);
      if (contact === null) {
        return res.status(404).send({ message: 'Contact not found' });
      }

      res.send({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
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
