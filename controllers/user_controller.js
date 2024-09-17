const userService = require('../services/user_service.js');
const { userValidator } = require('../validators/user_validator');

exports.getAll = async (req, res) => {
  try {
    res.json(await userService.getAll());
  } catch (error) {
    next(error);
  }
};


exports.add = async (req, res) => {
  const { error } = userValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await userService.add(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
