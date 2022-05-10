import mongoose from "mongoose";
import {Password} from '../services/password';



// an interface that describes the properties 
// that are required to create a new user 

interface UserAttrs{
  email:string,
  password:string 
}

// interface that describes the properties that a user model has 
interface UserModel extends mongoose.Model<UserDoc>
{
  build(attrs:UserAttrs):UserDoc;
}
// interface that describes the property that a user document has 
interface UserDoc extends mongoose.Document{
  email:string,
  password:string
}
const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required:true
  }
});
// using function instead of => to use the this. 
userSchema.pre('save',async function(done){
  // using isModified as for first time also it return true 
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password',hashed);
  }
  done();
});


// static function called directly on model 
userSchema.statics.build = (attrs: UserAttrs)=>{
  return new User(attrs);
};

const User= mongoose.model<UserDoc,UserModel>('User',userSchema);



export {User};