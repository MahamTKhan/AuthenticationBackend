const userRepo = require('../repositories/user_repo.js');

exports.getAll = () => {
  return userRepo.getAll();
};

exports.add = (userData) => {
  return userRepo.add(userData);
};
