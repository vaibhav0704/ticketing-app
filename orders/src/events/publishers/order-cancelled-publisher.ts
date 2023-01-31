import { OrderCancelledEvent, Publisher, Subjects } from "@vaibhavtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled; 
}