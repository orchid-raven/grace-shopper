const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderProduct} = require('../db/models')
const {AcquireCart, ClearIncompleteOrder, PopulateIncompleteOrder} = require('../utilities');

module.exports = router

// function isAuthenticated(req, res, next) {
//   if(req.user.authenticated) {
//     return next()
//   }
//   else {
//     res.redirect('/');
//   }
// }

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

router.get('/checkout', (req, res, next) => {
  try {
    if(!req.session.passport) {
      console.log("Please log in before checking out");
      res.redirect('/login');
    }
    else if (req.session.cart.length === 0) {
      console.log("Cannot checkout on Empty Cart");
      res.redirect('/home');
    }
    else {
      PopulateIncompleteOrder(req.session, true);
      req.session.cart = [];
      res.json([]);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/retrieveCart', async (req, res, next) => {
  try {
    let newCart = await AcquireCart(req.session);
    for (let i = 0; i < newCart.length; i++) {
      req.session.cart.push(newCart[i]);
    }
    console.log("NEW CART ------> ",req.session.cart);
    ClearIncompleteOrder(req.session);
    res.send(newCart);

  } catch (error) {
    next(error);
  }
});

router.get('/archiveCart', (req, res, next) => {
  try {
    if (req.session.cart.length > 0) {
      PopulateIncompleteOrder(req.session, false);
      res.json([]);
    }
  } catch (error) {
    next(error);
  }
})

router.get('/testground', async (req, res, next) => {
  AcquireCart(req.session);
})
