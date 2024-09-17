const userRoutes = require('../routes/user_routes.js');

module.exports = (app) => {
  app.use('/api/users', userRoutes);
};
