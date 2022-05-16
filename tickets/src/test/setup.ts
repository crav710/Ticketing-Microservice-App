import {MongoInstance, MongoMemoryServer} from 'mongodb-memory-server';
import mongoose  from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

let mongo:any; 
declare global {
  var signin: () => string[];
}


beforeAll(async ()=>{
  process.env.JWT_KEY = 'asdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
  
});

beforeEach(async ()=>{
  const collections = await mongoose.connection.db.collections();

  for(let collection of collections){
      await collection.deleteMany({});
  }
});


afterAll(async ()=>{
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin =  ()=>{
  // Simulating fake signin.
  // build a json webtoken payload{id,email} 
  const payload = {
    id:new mongoose.Types.ObjectId().toHexString(),
    email :'test@test.com'
  };

  // create a JWT! 
  const token = jwt.sign(payload,process.env.JWT_KEY!);

  // Build Session Object . {jwt : MY_JWT}

  const session = {jwt:token};

  // Turn that into JSON 
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base 64 

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];

};