import { Request, Response, RequestHandler } from 'express';
import { createUser } from '../services/users.service';


export default class Users {
  public static addUser : RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {
    const { email, password, name } = req.body;


    try {
      const addUser = await createUser(email, password, name);

      console.log(addUser);

      return res.status(200).json({
        message: `User registered successfully`,
        data: {
          token: 'sdfh'
        }
      });
    } catch (error) {
      console.log(error)

      return res.status(400).json({
        message: `System error, unable to register user`,
        data: null
      });
    }
  };


  public static listUsers : RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {
    const { email, password, name } = req.body;


    try {
      const addUser = await createUser(email, password, name);

      console.log(addUser);
      
      return res.status(200).json({
        status: true,
        message: `User list fetched successufully`
      });
    } catch (error) {

      return res.status(400).json({
        message: `Unable to list data plans`
      });
    }
  };
}
