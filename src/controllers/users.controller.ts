import { Request, Response, RequestHandler } from 'express';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { format } from 'date-fns';
import Config from '../config';
import { getUser, createUser, listUser } from '../services/users.service';
import { addPost, listUserPosts } from '../services/posts.service';



export default class Users {
  public static addUser : RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {
    const { email, password, name } = req.body;


    try {
      const user = await getUser(email);


      if (user.rowCount > 0) {
        return res.status(400).json({
          message: `User already exists`,
          data: null,
        });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser(email, hashedPassword, name);
      
      const newUserDetails = await getUser(email);
      const { id } = newUserDetails.rows[0]; 

      const userData = {
        user_id: id,
        email,
        name,
      };

      const token = Jwt.sign(userData, Config.SERVER.KEY, {
        algorithm: 'HS256',
        expiresIn: '12h',
      });

      return res.status(200).json({
        message: `User registered successfully`,
        token,
        data: userData,
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

    try {
      const allUsers = await listUser();
      
      const count = allUsers.rowCount;

      const list = allUsers.rows.map((user) => {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          registered: format(user.created_at, "MMM d, yyyy - h:mma")
        }
      })

      return res.status(200).json({
        message: `User list fetched successufully`,
        data: {
          count, list
        }
      });
    } catch (error) {

      return res.status(400).json({
        message: `Unable to get user's list`,
        data: null
      });
    }
  };




  public static allUserPosts : RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {
    const { id } = req.params;
    const { user_id } = req.user;

    try {
      if (id != user_id) {
        return res.status(400).json({
          message: `Path userId(${id}) is different from authenticated userId(${user_id})`,
          data: null
        });
      }


      const userPosts = await listUserPosts(id);
      
      const count = userPosts.rowCount;

      const list = userPosts.rows.map((post) => {
        return {
          post_id: post.id,
          user_id: post.user_id,
          title: post.title,
          content: post.content,
          posted_on: format(post.created_at, "MMM d, yyyy - h:mma")
        }
      })

      return res.status(200).json({
        message: `User posts fetched successufully`,
        data: {
          count, list
        }
      });
    } catch (error) {
      console.log(error)

      return res.status(400).json({
        message: `System error, unable to list user posts`,
        data: null
      });
    }
  };




  public static addUserPost : RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { user_id } = req.user;

    try {
      if (id != user_id) {
        return res.status(400).json({
          message: `Path userId(${id}) is different from authenticated userId(${user_id})`,
          data: null
        });
      }

      const post = await addPost(id, title, content);
     
      console.log(post)

      return res.status(200).json({
        message: `User post added successfully`,
        data: {

        }
      });
    } catch (error) {
      console.log(error)

      return res.status(400).json({
        message: `System error, unable to add user posts`,
        data: null
      });
    }
  };



  public static loginUser : RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {
    const { email, password } = req.body;

    try {
      const user = await getUser(email);

      if (user.rowCount === 0) {
        return res.status(400).json({
          message: `User does not exists`,
          data: null,
        });
      }
      

      const { id, name, password : hashedPassword } = user.rows[0];


      const passwordCheckk = await bcrypt.compare(password, hashedPassword);
      
      if(!passwordCheckk) {
        return res.status(400).json({
          message: `Incorrect email or password`,
          data: null,
        });
      }

      
      const userData = {
        user_id: id,
        email,
        name,
      };

      const token = Jwt.sign(userData, Config.SERVER.KEY, {
        algorithm: 'HS256',
        expiresIn: '12h',
      });



      return res.status(200).json({
        message: `User logged in successufully`,
        data: userData,
        token,
      });
    } catch (error) {

      return res.status(400).json({
        message: `Unable to login user`,
        data: null
      });
    }
  };
}
