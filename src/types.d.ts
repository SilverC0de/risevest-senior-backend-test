declare namespace Express {
  interface IAuthUser {
    user_id?: string;
    email?: string;
    name?: string;
  }
  
  export interface Request {
      user: IAuthUser;
  }
  export interface Response {
      user: any;
  }
}