const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
const OrderProduct = require('../db/models/order-product')
const {AcquireCart, ClearIncompleteOrder} = require('../utilities')

module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')


    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      await req.login(user, err => (err ? next(err) : res.json(user)))
      // check if user has an uncompleted order. if yes, move this to cart

      //gotta put this elsewhere --- Session gets reset at logout
      // let newCart = await AcquireCart(req.session);
      // req.session.cart = newCart;
      // console.log("NEW CART ------> ", req.session.cart);
      // ClearIncompleteOrder(req.session);
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  // insert cart productsId to uncompleted order for user


  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
