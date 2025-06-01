import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contactsRouter.js';
import { errorHandler, logger, notFound } from './middlewares/middlewares.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(logger);

  app.use('/contacts', contactsRouter);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
