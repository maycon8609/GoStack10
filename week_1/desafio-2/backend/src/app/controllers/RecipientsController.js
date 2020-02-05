import * as Yup from 'yup';
import Recipient from '../models/Recipients';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.body;

    const recipient = await Recipient.findOne({ where: { id } });

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    const { name, state, city } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      city,
      state,
    });
  }
}

export default new RecipientController();
