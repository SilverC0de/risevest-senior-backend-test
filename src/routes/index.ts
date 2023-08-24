import { Router } from 'express';
import user from './users.route';
const routes = Router();

routes.use('/', user);

export default routes;