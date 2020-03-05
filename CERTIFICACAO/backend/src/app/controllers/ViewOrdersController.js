import Orders from '../models/Orders';

class ViewOrdersController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const orders = await Orders.findAll({
      where: { deliveryman_id: id, canceled_at: null },
      order: ['id'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(orders);
  }
}

export default new ViewOrdersController();
