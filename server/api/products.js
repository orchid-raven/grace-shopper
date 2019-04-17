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
})

router.get('/:itemType/:id', async (req, res, next) => {
  try {
    const itemType = req.params.itemType
    const id = req.params.id
    const singleProduct = await Product.findAll({
      where: {
        productType: itemType,
        id: id
      }
    })
    if (singleProduct) {
      res.json(singleProduct)
    }
  } catch (err) {
    next(err)
  }
})


router.get('/featured', async (req, res, next) => {
  try {
    const features = await Product.findAll({
      where: {
        featured: true
      }
    });
    res.json(features);
  } catch (error) {
    next(error);
  }
})

router.put('/cart/add', (req, res, next) => {
  try {
    const addToCart = req.session.cart.push(req.body);
    res.json(addToCart);
  } catch (error) {
    next(error);
  }
})

router.put('/cart/delete', (req, res, next) => {
  try {
    let productToRemove = req.session.cart.find(cartItem => {
      if (Number(cartItem.id) === Number(req.body.id)) {
        return cartItem;
      }
    });
    let indexOfProduct = req.session.cart.indexOf(productToRemove);
    req.session.cart.splice(indexOfProduct, 1);
    res.json(req.session.cart);
  } catch (error) {
    next(error)
  }
})

router.get('/cart', (req, res, next) => {
  try {
    const cart = req.session.cart;
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

// GetItemTypes
router.get('/:itemType', async (req, res, next) => {
  try {
    const allItems = await Product.findAll({
      where: {
        productType: req.params.itemType
      }
    })
    res.json(allItems)
  } catch (err) {
    next(err)
  }
})
