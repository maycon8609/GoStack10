import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();

    return res.json(deliverymans);
  }

  async store(req, res) {
    const { email } = req.body;

    const userExists = await Deliveryman.findOne({ where: { email } });

    if (userExists) {
      return res.status(401).json({ error: ' Registered user ' });
    }

    const user = await Deliveryman.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.userId);

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res.status(401).json({ error: 'Deliveryman already exists' });
      }
    }

    const { id, name, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async destroy(req, res) {
    return res.json({ delete: true });
  }
}

export default new DeliverymanController();
