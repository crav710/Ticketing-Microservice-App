import request from 'supertest';
import { app } from '../../app';


it('fails when email does not exist is supplied', async () =>{
  await  request(app)
          .post('/api/users/signin')
          .send({
            email:    'test@test.com',
            password:  'password'
          })
          .expect(400);  
});


it('fails when an incorrect password is supplied',async ()=>{
  await request(app)
  .post('/api/users/signup')
  .send({
    email:    'test@test.com',
    password:  'password'
  })
  .expect(201);  

  await request(app)
  .post('/api/users/signin')
  .send({
    email:    'test@test.com',
    password:  'pas'
  })
  .expect(400); 

});

it('cookie is defined on valid login', async ()=>{

  await request(app)
  .post('/api/users/signup')
  .send({
    email:    'test@test.com',
    password:  'password'
  })
  .expect(201);  

  const response = await request(app)
  .post('/api/users/signin')
  .send({
    email:    'test@test.com',
    password:  'password'
  })
  .expect(200); 

  expect(response.get('Set-Cookie')).toBeDefined();

});