import { PaymentCompletedEvent, Publisher, Subjects } from "@vaibhavtickets/common";

export class PaymentCompletedPublisher extends Publisher<PaymentCompletedEvent> {
  readonly subject = Subjects.PaymentCompleted;
}