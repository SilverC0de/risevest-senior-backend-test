import { Router } from 'express';
import { check } from 'express-validator';
import UsersController from '../controllers/users.controller';

import authenticateUserRequest from '../middlewares/authenticator';
import validateRequest from '../middlewares/validator';


const router = Router();

router.get(
  '/',
  UsersController.listUsers
);

router.post(
  '/',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail({
        all_lowercase: true,
      }),

    check('password')
      .isStrongPassword({
        minLength: 5,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0,
      })
      .withMessage('Password must have at least 5 characters')
      .trim(),

    check('name')
      .isLength({ min: 2 })
      .withMessage('Please enter a valid name')
      .escape()
      .trim()
  ],
  validateRequest,
  UsersController.addUser
);


router.get(
  '/:id/posts',
  [
    check('id')
    .isNumeric()
    .withMessage('User id must be numeric')
    .trim()
  ],
  validateRequest,
  authenticateUserRequest,
  UsersController.allUserPosts
);

router.post(
  '/:id/posts',
  [
    check('id')
      .isNumeric()
      .withMessage('User id must be numeric')
      .trim(),

    check('title')
      .isLength({ min: 2 })
      .withMessage('Title must be more than 2 characters')
      .escape()
      .trim(),

    check('content')
      .isLength({ min: 2 })
      .withMessage('Post content must be more than 2 characters')
      .escape()
      .trim()
  ],
  validateRequest,
  authenticateUserRequest,
  UsersController.addUserPost
);

router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail({
        all_lowercase: true,
      }),

    check('password')
      .isStrongPassword({
        minLength: 5,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0,
      })
      .withMessage('Password must have at least 5 characters')
      .trim()
  ],
  validateRequest,
  UsersController.loginUser
);

export default router;
