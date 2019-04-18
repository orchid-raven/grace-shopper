const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  // A User may only have ONE incomplete order --- This is the cart at login / checkout / logout
  completedFlag: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Order;
