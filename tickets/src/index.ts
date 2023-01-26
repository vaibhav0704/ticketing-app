import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT must be defined');
  if (!process.env.MONGO_URI) throw new Error('MOGO_URI must be defined');
  try {
    console.log('Starting');
    await mongoose.connect(process.env.MONGO_URI)
    console.log('done')
    app.listen(3000, () => {
      console.log('Listening to port 3000!!!');
    });
  } catch (err) {
    console.error(err);
  }
}
start();