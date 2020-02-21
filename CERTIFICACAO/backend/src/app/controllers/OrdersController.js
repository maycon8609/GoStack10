import { format, setHours, setMinutes } from 'date-fns';
import * as Yup from 'yup';

import Orders from '../models/Orders';
import Recipients from '../models/Recipients';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

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
      attributes: ['id'],
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
          attributes: ['id', 'url'],
        },
      ],
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
      signature_id: Yup.number().integer(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { start_date, end_date } = req.query;

    const order = await Orders.findOne({ where: { id } });

    if (!order) {
      return res.status(401).json({ error: 'User does not exist' });
    }

    // Start Check to start_hour >= 08:00 && start_hour <= 18:00
    const available = format(Number(start_date), 'HH:mm');
    const minHour = format(setMinutes(setHours(new Date(), 8), 0), 'HH:mm');
    const maxHour = format(setMinutes(setHours(new Date(), 18), 0), 'HH:mm');

    if (available <= minHour || available >= maxHour) {
      return res.status(401).json({ error: 'Time unavailable for pickup' });
    }
    // End Check

    // start_date and end_date
    if (start_date && order.end_date === null) {
      const start = format(Number(start_date), "yyyy-MM-dd'T'HH:mm:ssxxx");
      req.body.start_date = start;
    }

    if (end_date && order.start_date !== null) {
      const end = format(Number(end_date), "yyyy-MM-dd'T'HH:mm:ssxxx");
      req.body.end_date = end;
    }

    if (end_date && order.start_date === null) {
      return res.status(401).json({ error: 'Please set start date before' });
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
