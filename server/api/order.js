const router = require('express').Router()
const Order = require('../db/models/order')
const Product = require('../db/models/product');

module.exports = router

router.get('/History', async (req, res, next) => {
  let history = await Order.findAll({
    include: [{model: Product}]
  });
  res.json(history);
});

router.get('/:orderId', async (req, res, next) => {
  let newOrder = await Order.findAll({
    where:{
    id: req.params.orderId
  },
    include: [{model: Product}]
  });
  res.json(newOrder);
});

router.delete('/ClearHistory', async (req, res, next) => {
  let history = await Order.findAll({
    include: [{model: Product}]
  });
  await history.destroy();
  res.send();
})
