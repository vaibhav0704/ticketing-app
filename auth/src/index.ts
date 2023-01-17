import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { singupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(singupRouter);

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

const start = async () => {
  try {
    console.log('Starting');
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('done')
    app.listen(3000, () => {
      console.log('Listening to port 3000!!!');
    });
  } catch (err) {
    console.error(err);
  }
}
start()