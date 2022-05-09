import  express  from "express";
const router = express.Router();

router.post('/api/users/signin',(req,res)=>{
   res.send('Hi There! Signin');
});

export {router as signinRouter};
