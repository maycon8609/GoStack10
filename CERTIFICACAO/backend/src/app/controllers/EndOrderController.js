import { format } from 'date-fns';
import Orders from '../models/Orders';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

class EndOrderController {
  async update(req, res) {
    // recipient's signature
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });

    req.body.signature_id = file.id;

    // End Order
    const { id_order } = req.params;
    const { end_date } = req.query;

    const order = await Orders.findByPk(id_order);

    if (!order) {
      return res.status(401).json({ error: 'User does not exist' });
    }

    if (order.start_date === null) {
      return res.status(401).json({ error: 'Please set start date before' });
    }

    if (order.end_date !== null) {
      return res.status(401).json({ error: 'Order already completed' });
    }

    if (!end_date) {
      return res.status(401).json({ error: 'Please set end date before' });
    }

    if (end_date && order.start_date !== null) {
      const end = format(Number(end_date), "yyyy-MM-dd'T'HH:mm:ssxxx");
      req.body.end_date = end;
    }

    if (req.body.end_date <= order.start_date) {
      return res.status(401).json({
        error: 'end date cannot be less than or equal to the start date',
      });
    }

    const newOrder = await order.update(req.body);

    // Check number_orders
    const deliveryman = await Deliveryman.findByPk(order.deliveryman_id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (newOrder && deliveryman.number_orders > 0) {
      deliveryman.number_orders -= 1;
      await deliveryman.save();
    }

    return res.json(newOrder);
  }
}

export default new EndOrderController();
