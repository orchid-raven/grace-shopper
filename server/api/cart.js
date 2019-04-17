const router = require('express').Router()
const {Order} = require('../db/models')
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

router.get('/checkout', async (req, res, next) => {
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
      console.log("Checking Out");

      // insert cart products into order
      // clear cart

      let currentCart = req.session.cart;
      let newOrder = await Order.create({
        userId: req.session.passport.user
      });

      // Under Construction

    }

    // passport will be our test

    // if not logged in , redirect to log in

    // if no cart, redirect to Home for now
    // Empty Cart for now



  } catch (error) {
    next(error);
  }
})
