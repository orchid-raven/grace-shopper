const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

// Add to Cart

router.get('/test/', async (req, res, next) => {
  // req.session.cart = [345]
  // console.log(req.session)
  req.session.cart.push(345);
  console.log(req.session.cart);
  res.send("worked");
})
