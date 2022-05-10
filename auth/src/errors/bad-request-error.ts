import { CustomError } from "./custom-error";
export class BadRequestError extends CustomError{
  reason ='Error Connecting to Database';
  statusCode = 400;
  constructor(public message:string){
    super(message);
    Object.setPrototypeOf(this,BadRequestError.prototype);
  }
  serializeErrors(){
    return [{
      message:this.message
    }];
  }
}
