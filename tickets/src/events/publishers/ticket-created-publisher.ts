import { Publisher,TicketCreatedEvent,Subjects } from "@ticketzone/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  
}

