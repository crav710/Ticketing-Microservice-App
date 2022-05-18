import express, {Request , Response} from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth,OrderStatus } from '@ticketzone/common';
import { Order } from '../models/order';
import { OrderCancelledPublisher } from '../events/publisher/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

router.delete('/api/orders/:orderId',requireAuth,async (req:Request,res:Response) =>{
  // check validation for id 
  const {orderId} = req.params;
  const order = await Order.findById(orderId).populate('ticket');
  if(!order)
  {
    throw new NotFoundError();    
  }
  if(order.userId !== req.currentUser!.id){
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();
  // publish 

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id:order.id,
    ticket:{
      id : order.ticket.id
    }
  })

  res.status(204).send(order);
});


export {router as deleteOrderRouter}