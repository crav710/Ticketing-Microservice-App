import request from 'supertest';
import { app } from '../../app';


it('returns a 201 on successfull signup', async () =>{
  return request(app)
          .post('/api/users/signup')
          .send({
            email:    'test@test.com',
            password:  'password'
          })
          .expect(201);  
});

it('return a 400 with an invalid email',async ()=>{
  return request(app)
  .post('/api/users/signup')
  .send({
    email:    'testaaass',
    password:  'password'
  })
  .expect(400);  

});

it('return a 400 with an invalid password',async ()=>{
  return request(app)
  .post('/api/users/signup')
  .send({
    email:    'test@test.com',
    password:  '123'
  })
  .expect(400);  

});

it('return a 400 with an missing email and  password',async ()=>{
  await  request(app)
  .post('/api/users/signup')
  .send({
    email:    'test@test.com'
  })
  .expect(400);  

  await  request(app)
  .post('/api/users/signup')
  .send({
    password: '1234'
  })
  .expect(400); 
});

it('disallows duplicate emails',async() =>{
  await request(app)
    .post('/api/users/signup')
    .send({
      email:'test@test.com',
      password:'password'
    })
    .expect(201);
    await request(app)
    .post('/api/users/signup')
    .send({
      email:'test@test.com',
      password:'password'
    })
    .expect(400);
});


it('sets a cookie after sucessful signup',async()=>{
 const response =  await request(app)
    .post('/api/users/signup')
    .send({
      email:'test@test.com',
      password:'password'
    })
    .expect(201);
  // to get cookie you need secure https connection .   
  expect(response.get('Set-Cookie')).toBeDefined();  

});