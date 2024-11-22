// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../configs/db.config');

// class users extends Model {
//   static async hashPassword(password) {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);
//   }
// }
// const users = sequelize.define('users', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   Firstname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   Lastname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   Organizationname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   Employeeid: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// },
//   {
//     tableName: 'users',
//     timestamps: true,
//   });

// module.exports = users;
const bcrypt = require("bcrypt");
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/db.config');

class Users extends Model {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}

const users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  organnizationname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Employeeid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = users;
