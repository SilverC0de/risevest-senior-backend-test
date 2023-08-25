import { Request, Response, RequestHandler } from 'express';
import ioredis from 'ioredis';
import getTop3UsersByPosts from '../services/top3.service';

export default class Top3 {
  public static top3UsersByPosr : RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {

    try {
      const top3 = await getTop3UsersByPosts();
      
      return res.status(200).json({
        message: `Top 3 users by post listed`,
        data: top3.rows
      });
    } catch (error) {
      console.log(error)

      return res.status(400).json({
        message: `System error, unable to list top 3`,
        data: null
      });
    }
  };
}