const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order-product', {
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
} );

module.exports = OrderProduct;
