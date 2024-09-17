const app = require('./configs/config');
const { sequelize } = require('./configs/db.config');
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
    process.exit(1);
  });

