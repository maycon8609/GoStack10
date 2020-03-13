import DeliveryProblem from '../models/DeliveryProblem';
import Orders from '../models/Orders';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/cancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const { id_delivery } = req.params;

    const { id, product } = await Orders.findByPk(id_delivery);

    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: id_delivery },
      order: ['id'],
      attributes: ['id', 'description', 'created_at'],
    });

    return res.json({ id, product, problems });
  }

  async create(req, res) {
    const { id_delivery } = req.params;

    const order = await Orders.findByPk(id_delivery);

    if (!order) {
      return res.status(401).json({ error: 'order does not exist' });
    }

    if (order.start_date === null) {
      return res.status(401).json({
        error:
          'you cannot register a problem if the order has not yet been withdrawn',
      });
    }

    req.body.delivery_id = id_delivery;

    const delivery = await DeliveryProblem.create(req.body);

    return res.json(delivery);
  }

  async destroy(req, res) {
    const { id_problem } = req.params;

    const { delivery_id } = await DeliveryProblem.findByPk(id_problem);

    const problem = await Orders.findByPk(delivery_id, {
      attributes: ['id', 'product'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await Queue.add(CancellationMail.key, {
      problem,
    });

    return res.json(problem);
  }
}

export default new DeliveryProblemController();
