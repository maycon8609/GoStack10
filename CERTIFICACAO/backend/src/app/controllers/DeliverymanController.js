import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();

    return res.json(deliverymans);
  }

  async store(req, res) {
    const { email } = req.body;

    const userExist = await Deliveryman.findOne({ where: { email } });

    if (userExist) {
      return res.status(401).json({ error: ' Registered user ' });
    }

    const user = await Deliveryman.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    return res.json({ update: true });
  }

  async destroy(req, res) {
    return res.json({ delete: true });
  }
}

export default new DeliverymanController();
