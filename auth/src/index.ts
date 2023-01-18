import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT must be defined');
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
start();