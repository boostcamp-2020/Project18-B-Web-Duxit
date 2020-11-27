import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';

const createApplication = () => {
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.FRONTEND_ORIGIN,
    }),
  );
  app.use(express.urlencoded({ extended: false }));

  app.use('/', indexRouter);
  return app;
};

export default createApplication;
