import { Router } from 'express';
import authMiddleware from './app/middlewares/authMiddleware';
import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'API com autenticação JWT' }),
);

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.authenticate);
routes.get('/users', authMiddleware, UserController.index);

export default routes;
