import { Publisher, Subjects, TicketUpdatedEvent } from "@vaibhavtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}