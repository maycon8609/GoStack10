import { Op } from 'sequelize';
import Orders from '../models/Orders';

class ParcelsDeliveredController {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const { page = 1 } = req.query;

    const orders = await Orders.findAll({
      where: { deliveryman_id, end_date: { [Op.ne]: null } },
      order: ['id'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(orders);
  }
}

export default new ParcelsDeliveredController();
