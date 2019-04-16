const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:itemType/:id', async (req, res, next) => {
  try {
    const itemType = req.params.itemType
    const id = req.params.id
    const singleProduct = await Product.findOne({
      where: {productType: itemType, id: id}
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})
