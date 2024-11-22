
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db.config');
const jwt = require('jsonwebtoken');


const linkedinUsers = sequelize.define('linkedinUsers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  linkedinId: {
    type: DataTypes.STRING,
    allowNull: false,  // This is required for LinkedIn OAuth sign-in
    unique: true,      // Each LinkedIn ID should be unique
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // Full name of the user from LinkedIn
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,      // User email should be unique as well
  },
  organizationName: {
    type: DataTypes.STRING,
    allowNull: true,  // Optional field for organization (if provided by LinkedIn)
  },
}, {
  tableName: 'linkedinUsers',
  timestamps: true,
});

linkedinUsers.prototype.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: '3d', 
  });
  return token;
};

module.exports = linkedinUsers;
