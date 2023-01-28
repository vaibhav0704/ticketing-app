import { Publisher, Subjects, TicketCreatedEvent } from "@vaibhavtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}