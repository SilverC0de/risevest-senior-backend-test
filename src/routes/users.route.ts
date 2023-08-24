import { Router } from 'express';
import { check } from 'express-validator';
import UsersController from '../controllers/users.controller';


const router = Router();

router.get(
  '/users',
  UsersController.listUsers
);

export default router;
