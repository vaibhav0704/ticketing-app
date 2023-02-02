import Queue from 'bull';
import { ExpirationCompleteEventPublisher } from '../events/publisher/expiration-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST
  }
});

expirationQueue.process(async (job) => {
  new ExpirationCompleteEventPublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  })
});

export { expirationQueue };