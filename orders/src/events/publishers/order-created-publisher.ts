import { OrderCancelledEvent, OrderCreatedEvent, Publisher, Subjects } from "@vaibhavtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;  
}