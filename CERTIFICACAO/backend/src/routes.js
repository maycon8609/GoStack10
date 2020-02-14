import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); // register user
routes.post('/sessions', SessionController.store); // create session

routes.use(authMiddleware); // validation user

routes.put('/users', UserController.update); // update user

routes.post('/recipients', RecipientsController.store); // create recipient
routes.put('/recipients/:id', RecipientsController.update); // update recipient

export default routes;
