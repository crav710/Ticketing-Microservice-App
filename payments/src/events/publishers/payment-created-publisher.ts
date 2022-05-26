import { Subjects,Publisher,PaymentCreatedEvent } from "@ticketzone/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  subject:Subjects.PaymentCreated = Subjects.PaymentCreated;
}