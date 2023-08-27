import jwt  from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

const authenticator = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization as string;
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: 'Authorization is required',
      });
    }

    
    const token = authHeader.split(' ')[1];
    const verifiedUser = jwt.verify(token, config.SERVER.KEY, {
      algorithms: ['HS256'],
    }) as jwt.JwtPayload;


    if (verifiedUser) {
      req.user = verifiedUser;

      next();
    } else {
      return res.status(401).json({
        status: false,
        message: 'Invalid authentication token',
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Invalid authentication token',
    });
  }
};

export default authenticator;
