const router = require('express').Router()
const Order = require('../db/models/order')
const Product = require('../db/models/product');

module.exports = router

router.get('/:orderId', async (req, res, next) => {
  let newOrder = await Order.findOne({
    where:{
    id: req.params.orderId
  },
    include: [{model: Product}]
  });
  res.json(newOrder);
});
