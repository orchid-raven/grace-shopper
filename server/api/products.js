const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GetAll
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
});

// GetItemTypes
router.get('/:ItemType', async (req, res, next) => {
  try {
    const allItems = await Product.findAll({ where: {
      productType: req.params.ItemType
    }});
    res.json(allItems);
  } catch (err) {
    next(err)
  }
});
