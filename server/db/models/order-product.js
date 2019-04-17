const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order-product', {
  currentPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
} );

module.exports = OrderProduct;
