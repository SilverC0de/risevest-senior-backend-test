import { Router } from 'express';
import { check } from 'express-validator';
import Top3Controller from '../controllers/top3.controller';

import validateRequest from '../middlewares/validator';


const router = Router();


router.get(
  '/',
  Top3Controller.top3UsersByPosr
);

export default router;
