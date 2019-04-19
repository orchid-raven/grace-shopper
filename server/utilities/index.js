const {Order, Product, OrderProduct} = require('../db/models/');

const AcquireCart = async (session) => {

  let cart = [];
  let prevOrder = await Order.findOne({where:{
    userId: session.passport.user,
    completedFlag: false
  }});

  if(prevOrder) {
    let cartProducts = await prevOrder.getProducts(); //an array
    console.log("ARRAY OF CART PRODUCTS -----> ",cartProducts);

    for(let i = 0; i < cartProducts.length; i++) {
      for(let n = 0; n < cartProducts[i]['order-product'].quantity; n++) {
        cart.push({
          id: cartProducts[i].id,
          name: cartProducts[i].name,
          price: cartProducts[i].price,
          imgUrl: cartProducts[i].imgUrl
        })
      }
    }
  }

  console.log(cart);
  return cart;
}

const ClearIncompleteOrder = async (session) => {

  let prevOrder = await Order.findOne({where:{
    userId: session.passport.user,
    completedFlag: false
  }});

  if(prevOrder) {
    let ordProdList = await OrderProduct.findAll({where:{
      orderId: prevOrder.id
    }})
    for(let i = 0; i < ordProdList.length; i++) {
      await ordProdList[i].destroy();
    }
  }
}

const PopulateIncompleteOrder = async (session, completedFlag) => {
  let currentCart = session.cart;

  let newOrder = await Order.findOne({where:{
    userId: session.passport.user,
    completedFlag: false
  }})

  if (!newOrder) {
    newOrder = await Order.create({
      userId: session.passport.user
    });
  }

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

    ordertotalPrice += currentCart[i].price;             /* Plus the above, we have 2 seeds worth $20 each; totalPrice goes from $56 to $68 */
  };

  await newOrder.update({
    completedFlag,
    totalPrice: ordertotalPrice
  });
}

module.exports = {
  AcquireCart, ClearIncompleteOrder, PopulateIncompleteOrder
}
