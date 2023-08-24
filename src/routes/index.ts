import { Router } from 'express';
import users from './users.route';
import posts from './posts.route';
const routes = Router();

routes.use('/users', users);
routes.use('/posts', posts);

export default routes;