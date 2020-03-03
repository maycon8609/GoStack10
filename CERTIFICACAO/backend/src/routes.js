import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import OrdersController from './app/controllers/OrdersController';

import authMiddleware from './app/middlewares/auth';
import isAdminMiddleware from './app/middlewares/isAdmin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // register users
routes.post('/sessions', SessionController.store); // create session

// validation user
routes.use(authMiddleware);

/** User
 *  Routes put and delete use middleware check is_admin
 */

routes.get('/users', UserController.index);
routes.put('/users', isAdminMiddleware, UserController.update);
routes.delete('/users/:id', isAdminMiddleware, UserController.delete);

// Recipient

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);

/** All Deliveryman routes use middleWare check user is admin
 *  Functionality reserved for administrators
 */

routes.get('/deliverymans', isAdminMiddleware, DeliverymanController.index);
routes.post('/deliveryman', isAdminMiddleware, DeliverymanController.store);
routes.put(
  '/deliveryman/:user',
  isAdminMiddleware,
  DeliverymanController.update
);
routes.delete(
  '/deliveryman/:user',
  isAdminMiddleware,
  DeliverymanController.destroy
);

// File

routes.post('/files', upload.single('file'), FileController.store);

/** All Order routes use middleWare check user is admin
 *  Functionality reserved for administrators
 */

routes.get('/orders', isAdminMiddleware, OrdersController.index);
routes.post('/orders', isAdminMiddleware, OrdersController.store);
routes.put('/orders/:id', isAdminMiddleware, OrdersController.update);
routes.delete('/orders/:id', isAdminMiddleware, OrdersController.delete);

export default routes;
