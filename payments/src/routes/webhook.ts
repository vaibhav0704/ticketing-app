import { NotFoundError } from '@vaibhavtickets/common';
import express, { Request, Response } from 'express';
import { endpointSecret } from '../../whsec';
import { PaymentCompletedPublisher } from '../events/publishers/payment-completed-publisher';
import { Payment } from '../models/payment';
import { natsWrapper } from '../nats-wrapper';
import { stripe } from '../stripe';

const router = express.Router();

router.post(
  '/api/payments/webhook',
  async (req: Request, res: Response) => {
    let event = req.body;
    console.log(event.type);

    // if (endpointSecret) {
    //   const signature = req.headers['stripe-signature'];
    //   try {
    //     event = stripe.webhooks.constructEvent(
    //       req.body,
    //       signature!,
    //       endpointSecret
    //     );
    //   } catch (err: any) {
    //     console.log(`⚠️  Webhook signature verification failed.`, err.message);
    //     return res.status(200);
    //   }
    // };

    switch(event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const sessionId = session.id;

        const payment = await Payment.findOne({ sessionId });
        
        if (!payment) throw new NotFoundError();

        new PaymentCompletedPublisher(natsWrapper.client).publish({
          id: payment.id,
          orderId: payment.orderId,
          sessionId: payment.sessionId
        });

        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
        console.log(event);
    }

    res.status(200);
  }
);

export { router as webhookRouter }