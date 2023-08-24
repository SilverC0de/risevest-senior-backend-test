import { Request, Response, RequestHandler } from 'express';
import { randomUUID } from 'crypto';

export default class Users {
  public static listUsers : RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {
    const { email } = req.body;

    try {
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
