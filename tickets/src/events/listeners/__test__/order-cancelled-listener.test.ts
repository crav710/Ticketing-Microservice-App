import { OrderCancelledListener } from "../order-cancelled-listener";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { OrderCancelledEvent, OrderStatus } from "@ticketzone/common";
import { Ticket } from "../../../models/ticket"; 
import { Message } from 'node-nats-streaming';
const setup = async ()=>{

  const listener = new OrderCancelledListener(natsWrapper.client);
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title:'concert',
    price:99,
    userId:'adsddfd',
  })
  
  ticket.set({orderId});

  await ticket.save();

  const data : OrderCancelledEvent['data'] = {
    version :0,
    id: orderId,
    ticket: {
      id:ticket.id
    }
  };
  //@ts-ignore
  const msg:Message ={
    ack:jest.fn()
  };

  return {listener,data,msg,ticket};
};


it('updates  the ticket ,publishes a ticket , acks a message ',async ()=>{
  const {listener,data,msg,ticket} = await setup();

  await listener.onMessage(data,msg);

  const updatedTicket =  await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();

  expect(msg.ack).toHaveBeenCalled();

  expect(natsWrapper.client.publish).toHaveBeenCalled();

});
