const router = require('express').Router()
module.exports = router

router.get('/', (req, res, next) => {
  try {
    const cart = req.session.cart;
    res.json(cart)
  } catch (error) {
    next(error)
  }
})


router.put('/add', (req, res, next) => {
  try {
    const addToCart = req.session.cart.push(req.body);
    res.json(addToCart);
  } catch (error) {
    next(error);
  }
})

router.put('/delete', (req, res, next) => {
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

