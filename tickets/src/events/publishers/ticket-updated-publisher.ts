import { Publisher,TicketUpdatedEvent,Subjects } from "@ticketzone/common";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;  
}

