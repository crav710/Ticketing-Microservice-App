import { Ticket } from "../ticket";

it('implements optimistic concurrency control',async ()=>{
  // create an instance of ticket 
  const ticket = await Ticket.build({
    title  : 'concert',
    price  : 5,
    userId : '123'
  });
  // save the ticket 
  await ticket.save();

  // fetch the ticket twice 
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  
  //

  await firstInstance!.save();

  try{
    await secondInstance!.save();
  }
  catch(err){
    return;
  }
  throw new Error('Should Not Reach this point');

});

it('increments the version no on multiple saves',async ()=>{
  const ticket = await Ticket.build({
    title  : 'concert',
    price  : 5,
    userId : '123'
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});