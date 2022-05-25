import { OrderCreatedListener } from "../order-created-listeners";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@ticketzone/common";
import { Ticket } from "../../../models/ticket"; 
import { Message } from 'node-nats-streaming';
const setup = async ()=>{

  const listener = new OrderCreatedListener(natsWrapper.client);
  
  const ticket = Ticket.build({
    title:'concert',
    price:99,
    userId:'adsddfd'
  })
  await ticket.save();

  const data : OrderCreatedEvent['data'] = {
    version :0,
    id: new mongoose.Types.ObjectId().toHexString(),
    status : OrderStatus.Created,
    expiresAt:'jhsadjhbsad',
    ticket: {
      id:ticket.id,
      price:ticket.price
    },
    userId: 'aadasddadd'
  };
  //@ts-ignore
  const msg:Message ={
    ack:jest.fn()
  };

  return {listener,data,msg,ticket};
};

it('sets the user id of the ticket',async ()=>{
  const {listener,data,msg,ticket} = await setup();

  await listener.onMessage(data,msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);


});

it('acks the message ',async ()=>{
  const {listener,data,msg,ticket} = await setup();

  await listener.onMessage(data,msg);

  expect(msg.ack).toHaveBeenCalled();

});

it('publishes a ticket updated event',async ()=>{
  const {listener,data,msg,ticket} = await setup();

  await listener.onMessage(data,msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

  expect(ticketUpdatedData.orderId).toEqual(data.id);

});
