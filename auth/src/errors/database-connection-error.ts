import { CustomError } from "./custom-error";
export class DatabaseConnectionError extends CustomError{
  reason ='Error Connecting to Database';
  statusCode = 500;
  constructor(){
    super('Data Base Validation');
    Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
  }
  serializeErrors(){
    return [{
      message:this.reason
    }];
  }
}
