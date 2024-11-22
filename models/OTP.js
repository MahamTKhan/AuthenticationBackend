// In models/OTP.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db.config');

const OTP = sequelize.define('OTP', {
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  otp: { 
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  createdAt: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW,
  },
  expiresAt: {
    type: DataTypes.DATE, 
    allowNull: false, 
  },
}, {
  tableName: 'OTP',
  timestamps: true,
});


module.exports = OTP; 
