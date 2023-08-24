import { Router } from 'express';
import { check } from 'express-validator';
import PostsController from '../controllers/posts.controller';

import authenticateUserRequest from '../middlewares/authenticator';
import validateRequest from '../middlewares/validator';


const router = Router();


router.post(
  '/:post_id/comments',
  [
    check('post_id')
      .isNumeric()
      .withMessage('User id must be numeric')
      .trim(),

    check('comment')
      .isLength({ min: 1 })
      .withMessage('Comment must have at least 1 character')
      .escape()
      .trim(),
  ],
  validateRequest,
  authenticateUserRequest,
  PostsController.postUserComment
);

export default router;
