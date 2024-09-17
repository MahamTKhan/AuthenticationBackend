const users = require('../models/users'); 

exports.getAll = async () => {
  try {
    return await users.findAll(); 
  } catch (error) {
    next(error);
  }
};

exports.add = async (userData) => {
  try {
    return await Users.create(userData);
  } catch (error) {
    next(error);
  }
};
