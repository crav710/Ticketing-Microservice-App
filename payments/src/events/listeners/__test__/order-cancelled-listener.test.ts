import { OrderCancelledListener } from "../order-cancelled-listener";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { OrderCancelledEvent, OrderStatus } from "@ticketzone/common";
import { Message } from 'node-nats-streaming';
import { Order } from "../../../models/order";
const setup = async ()=>{

  const listener = new OrderCancelledListener(natsWrapper.client);
  const order = Order.build({
    id      : new mongoose.Types.ObjectId().toHexString(),
    status  : OrderStatus.Created,
    price   : 10,
    userId  : 'aasdasfd',
    version : 0    
  })
  await order.save();

  const data : OrderCancelledEvent['data'] = {
    version :1,
    id: order.id,
    ticket: {
      id:'saadasd'
    }
  };
  //@ts-ignore
  const msg:Message ={
    ack:jest.fn()
  };

  return {listener,data,msg,order};
};


it('updates  the status of the order  ',async ()=>{
  const {listener,data,msg,order} = await setup();

  await listener.onMessage(data,msg);

  const updatedOrder =  await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);

});

it('acks the message',async ()=>{
  const {listener,data,msg} = await setup();

  await listener.onMessage(data,msg);

  expect(msg.ack).toHaveBeenCalled();
});
