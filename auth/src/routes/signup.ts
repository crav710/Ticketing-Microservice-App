import  express,{Request,Response}  from "express";
import  {body}   from "express-validator";
import { User } from "../models/user";
import { BadRequestError,validateRequest } from "@ticketzone/common";
import  jwt  from "jsonwebtoken";
const router = express.Router();

router.post('/api/users/signup',[
  body('email')
  .isEmail()
  .withMessage('Email must be valid'),
  body('password')
  .trim()
  .isLength({min:4,max:20})
  .withMessage('Password must be between 4 and 20')
],validateRequest,async (req:Request,res:Response)=>{
  // Query for email 
  const {email , password} = req.body;

  const existingUser = await User.findOne({email});
  
  if(existingUser){
    throw new BadRequestError('Email in use');
  }

  // Create User 
  const user = User.build({email,password});
  await user.save();

  // generate JWT token 
  const userJwt = jwt.sign({
    id:user.id,
    email:user.email
  },process.env.JWT_KEY!
  );

  // Add to sessions object 

  // types file return null so we define the object 
  req.session = {
    jwt : userJwt
  }


  res.status(201).send(user);
});

export {router as signupRouter};
