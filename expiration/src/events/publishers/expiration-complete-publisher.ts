import { Publisher,ExpirationCompleteEvent,Subjects } from "@ticketzone/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;  
}

