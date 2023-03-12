import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@vaibhavtickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { stripe } from '../stripe';

const router = express.Router()

router.post(
  '/api/payments',
  requireAuth,
  [
    body('orderId')
      .not()
      .isEmpty()
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) throw new NotFoundError();

    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    if (order.status === OrderStatus.Cancelled) throw new BadRequestError('Cannot pay for expired order');

    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `http://ticket.devaibhav.me/orders/`,
        cancel_url: `http://ticket.devaibhav.me/orders/`,
        currency: "inr",
        mode: 'payment',
        line_items: [{
          quantity: 1,
          price_data: {
            currency: 'inr',
            unit_amount: order.price * 100,
            product_data: {
              name: order.id
            }
          }
        }]
      });
      const payment = Payment.build({
        orderId,
        sessionId: session.id,
      });
      await payment.save();  
  
      res.status(201).send({ url: session.url });
    } catch (err: any) {
      console.log(err);
      throw new BadRequestError(err.message)
    }
  }
);

export { router as createChargeRouter };