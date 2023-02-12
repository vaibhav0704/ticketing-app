import { Listener, OrderStatus, PaymentCompletedEvent, Subjects } from "@vaibhavtickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";

export class PaymentCompletedListener extends Listener<PaymentCompletedEvent> {
  readonly subject = Subjects.PaymentCompleted;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCompletedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) throw new Error('Order not found');

    order.set({
      status: OrderStatus.Complete
    });
    await order.save();

    msg.ack();
  }
}