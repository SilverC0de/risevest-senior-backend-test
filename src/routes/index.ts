import { Router } from 'express';
import users from './users.route';
import posts from './posts.route';
import top3 from './top3.route';
const routes = Router();

routes.use('/users', users);
routes.use('/posts', posts);
routes.use('/top3', top3);

export default routes;