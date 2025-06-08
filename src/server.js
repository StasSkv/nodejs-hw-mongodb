import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';

import contactsRouter from './routers/contacts.js';
import welcomeRouter from './routers/home.js';

import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(logger);
  app.use(welcomeRouter);
  app.use(contactsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
