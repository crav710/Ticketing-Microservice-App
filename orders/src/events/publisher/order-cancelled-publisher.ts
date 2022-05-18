import { Publisher,OrderCancelledEvent,Subjects } from "@ticketzone/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;  
}

