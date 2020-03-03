import User from '../models/User';

export default async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });

    if (user.is_admin !== true) {
      return res.status(401).json('Functionality reserved for administrators');
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: `error admin... ${req.userId}` });
  }
};
