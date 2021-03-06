const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  completedFlag: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Order;
