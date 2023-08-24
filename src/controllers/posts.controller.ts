import { Request, Response, RequestHandler } from 'express';
import { format } from 'date-fns';
import Config from '../config';
import { getPost, postComment } from '../services/posts.service';


export default class Users {
  public static postUserComment : RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {
    const { post_id } = req.params;
    const { comment } = req.body;
    const { user_id } = req.user;

    try {
      const getPostDetails = await getPost(post_id);

      if(getPostDetails.rowCount === 0){
        return res.status(400).json({
          message: `Post Id does not exist`,
          data: null
        });
      }


      await postComment(user_id, post_id, comment);


      return res.status(200).json({
        message: `Your comment has been posted`,
        data: null
      });
    } catch (error) {
      console.log(error)

      return res.status(400).json({
        message: `System error, unable to post comment`,
        data: null
      });
    }
  };
}