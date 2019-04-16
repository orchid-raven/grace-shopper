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
router.get('/:itemType', async (req, res, next) => {
  console.log("Inside");
  try {
    console.log("ROUTER ITEM TYPE ", req.params.itemType);
    const allItems = await Product.findAll({ where: {
      productType: req.params.itemType
    }});
    console.log("RETURN ", allItems);
    res.json(allItems);
  } catch (err) {
    next(err)
  }
});
