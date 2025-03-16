import express, { json } from 'express';
import cors from 'cors';

import routes from './routes';
import { FRONT_URL, PORT } from './utils/constants';
import { prisma } from './services/prisma';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(
  cors({
    origin: FRONT_URL, // puting this we can allow to get request from react frontend that runs in 3000 :D oversecurity
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(json());
app.use('/', routes);
app.use(errorHandler);

const main = async () => {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(`[server]: Error on initializing server => ${e}`);
  }
};

main().then();
