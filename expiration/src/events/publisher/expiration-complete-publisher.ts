import { ExpirationCompleteEvent, Publisher, Subjects } from "@vaibhavtickets/common";

export class ExpirationCompleteEventPublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}