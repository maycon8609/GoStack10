import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // register ADNIN
routes.post('/sessions', SessionController.store); // create session

routes.use(authMiddleware); // validation user

// User

routes.put('/users', UserController.update);

// Recipient

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);

// Deliveryman

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:user', DeliverymanController.update);
routes.delete('/deliveryman/:user', DeliverymanController.destroy);

// File

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
