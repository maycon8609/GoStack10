import * as Yup from 'yup';

import Orders from '../models/Orders';
import Recipients from '../models/Recipients';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import MailOrder from '../jobs/MailOrder';
import Queue from '../../lib/Queue';

class OrdersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = await Orders.create(req.body);

    const order = await Orders.findOne({
      where: { id },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    await Queue.add(MailOrder.key, {
      order,
    });

    return res.json(order);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const orders = await Orders.findAll({
      attributes: ['id'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().integer(),
      deliveryman_id: Yup.number().integer(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const order = await Orders.findOne({ where: { id } });

    if (!order) {
      return res.status(401).json({ error: 'User does not exist' });
    }

    const newOrder = await order.update(req.body);

    return res.json({ newOrder });
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Orders.findByPk(id);

    if (!order) {
      return res.status(401).json({ error: 'User not found' });
    }

    await order.destroy();

    return res.json(order);
  }
}

export default new OrdersController();
