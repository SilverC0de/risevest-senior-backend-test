import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();

    return res.status(422).json({
      message: errorsArray[0].msg,
    });
  }

  next();
};

export default validateRequest;
