const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    // logging: false,
    logging:
      process.env.NODE_ENV === 'development'
        ? (msg) => console.log(`Sequelize Log: ${msg} \n`)
        : false,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    retry: {
      max: 5,
    },

    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false, // (can use self-signed certs)
    //   },
    // },

    query: {
      timeout: 60000,
    },
    connectionTimeoutMillis: 30000,

    define: {
      underscored: true,
      freezeTableName: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

sequelize
  .sync()
  .then(() => console.log('All models were synchronized successfully.'))
  .catch((err) => console.error('Error synchronizing models:', err));

module.exports = { sequelize };

