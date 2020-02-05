import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); // cadastrar usuario
routes.post('/sessions', SessionController.store); // criar sessao

routes.use(authMiddleware); // validação de usuario logado

routes.put('/users', UserController.update); // atualizar usuario

routes.post('/recipients', RecipientsController.store); // criar pedido
routes.put('/recipients/:id', RecipientsController.update); // atualizar pedido

export default routes;
