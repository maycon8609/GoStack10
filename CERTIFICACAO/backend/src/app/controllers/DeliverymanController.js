import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();

    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const userExists = await Deliveryman.findOne({ where: { email } });

    if (userExists) {
      return res.status(401).json({ error: ' Registered user ' });
    }

    const user = await Deliveryman.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { user } = req.params;
    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(user);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Invalid ID' });
    }

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
    const { user } = req.params;

    const deliveryman = await Deliveryman.findOne({
      where: { id: user },
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman Invalid' });
    }

    await deliveryman.destroy();

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();
