import { Router } from 'express';

const routes = new Router();

routes.get('/teste', (req, res) => {
  return res.json({ mesage: 'Hello RocketSeat ' });
});

export default routes;
