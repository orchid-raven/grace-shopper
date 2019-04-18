const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderProduct} = require('../db/models')

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
      console.log()
      let currentCart = req.session.cart;

      // Tier 3
      // find if an old version currently exists

      let newOrder = await Order.create({
        userId: req.session.passport.user
      });

      // A User may only have ONE incomplete order --- This is the cart at login / checkout / logout

      // Tier 3 Accidental Material
      // Erase products that were used for login purposes - We need this to be zero to update our order with current cart
      // Possibly move this to login when checking for any existing cart

      // let prevProductsToClear = await OrderProduct.findAll({where: {
      //   orderId: newOrder.id
      // }});
      // for(let i = 0; i < prevProductsToClear.length; i++) {
      //   await prevProductsToClear[i].destroy();
      // }

      // Add each product currently on cart
      let ordertotalPrice = 0;
      for(let i = 0; i < currentCart.length; i++) {

        // see if the order-product pair exists
        let ordprodPair = await OrderProduct.findOne({ where: {
          orderId: newOrder.id,
          productId: currentCart[i].id,
        }});

        // if does not exist, create pair
        if(!ordprodPair) {
          ordprodPair = await OrderProduct.create({
            orderId: newOrder.id,
            productId: currentCart[i].id,
          });
        }

        await ordprodPair.update({
          quantity: ordprodPair.quantity + 1,                /* 3 roses before. Plus one, we now have 4 */
          price: ordprodPair.price + currentCart[i].price    /* 3 roses before worth $12 each and we're adding another rose; price goes from $36 to $48 */
        });

        ordertotalPrice += currentCart[i].price;  /* Plus the above, we have 2 seeds worth $20 each; totalPrice goes from $56 to $68 */
      };

      await newOrder.update({
        completedFlag: true,
        totalPrice: ordertotalPrice
      });

      req.session.cart = [];
      console.log("NEW CART ----->", req.session.cart);
      console.log("NEW ORDER ----->", newOrder);
      res.json(newOrder);
    }
  } catch (error) {
    next(error);
  }
})
