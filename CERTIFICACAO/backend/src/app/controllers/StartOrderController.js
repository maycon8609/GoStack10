import { format, setHours, setMinutes } from 'date-fns';
import Orders from '../models/Orders';
import Deliveryman from '../models/Deliveryman';

class StartOrderController {
  async update(req, res) {
    // Start Order
    const { id_order } = req.params;
    const { start_date } = req.query;

    const order = await Orders.findOne({ where: { id: id_order } });

    if (!order) {
      return res.status(401).json({ error: 'User does not exist' });
    }

    if (order.start_date !== null) {
      return res.status(401).json({ error: 'Order already started' });
    }

    // Start Check to start_hour >= 08:00 && start_hour <= 18:00
    const available = format(Number(start_date), 'HH:mm');
    const minHour = format(setMinutes(setHours(new Date(), 8), 0), 'HH:mm');
    const maxHour = format(setMinutes(setHours(new Date(), 18), 0), 'HH:mm');

    if (available <= minHour || available >= maxHour) {
      return res.status(401).json({ error: 'Time unavailable for pickup' });
    }

    if (start_date && order.end_date === null) {
      const start = format(Number(start_date), "yyyy-MM-dd'T'HH:mm:ssxxx");
      req.body.start_date = start;
    }

    // Check number_orders
    const deliveryman = await Deliveryman.findByPk(order.deliveryman_id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(deliveryman.number_orders < 5)) {
      return res.status(401).json({ error: 'number of orders exceeded' });
    }

    deliveryman.number_orders += 1;
    await deliveryman.save();

    const newOrder = await order.update(req.body);

    return res.json({ newOrder });
  }
}

export default new StartOrderController();
