const {Order, OrderProduct, Product} = require('../db/models/');

const AcquireCart = async (session) => {

  let cart = [];

  // Try to Find an incomplete order for user
  let prevOrder = await Order.findOne({where:{
    userId: session.passport.user,
    completedFlag: false
  },
    include: [{model: Product}]
});

  if(prevOrder) {
    // Pushes each ( products X product.quantity ) into cart array
    for(let i = 0; i < prevOrder.products.length; i++) {
      for(let n = 0; n < prevOrder.products[i]['order-product'].quantity; n++) {
        cart.push({
          id: prevOrder.products[i].id,
          name: prevOrder.products[i].name,
          price: prevOrder.products[i].price,
          imgUrl: prevOrder.products[i].imgUrl
        })
      }
    }
  }
  return cart;
}

const ClearIncompleteOrder = async (session) => {

  // Try to Find an incomplete order for user
  let prevOrder = await Order.findOne({where:{
    userId: session.passport.user,
    completedFlag: false
  }
});

  if(prevOrder) {

    // Find all order-product relations related to the order
    let ordProdList = await OrderProduct.findAll({where:{
      orderId: prevOrder.id
    }})

    // Destroys all order-product relations, but keeps the order instance
    for(let i = 0; i < ordProdList.length; i++) {
      await ordProdList[i].destroy();
    }
  }
}

const PopulateIncompleteOrder = async (session, completedFlag) => {
  let currentCart = session.cart;

  if(session.cart !== []) {
    // Find an incomplete order for user. If none, create one
    let newOrder = await Order.findOne({where:{
      userId: session.passport.user,
      completedFlag: false
    }})

    if (!newOrder) {
      newOrder = await Order.create({
        userId: session.passport.user
      });
    }

    // Variable for Total Price of the Order, which contains all the products in the order
    let ordertotalPrice = 0;

    // Add each product currently on cart
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

      // Quantity: +1, ProductPrice: +$ProductInstancePrice, TotalOrderPrice: +$ProductInstancePrice
      await ordprodPair.update({
        quantity: ordprodPair.quantity + 1,                /* 3 roses before. Plus one, we now have 4 */
        price: ordprodPair.price + currentCart[i].price    /* 3 roses before worth $12 each and we're adding another rose; price goes from $36 to $48 */
      });

      ordertotalPrice += currentCart[i].price;             /* Plus the above, we have 2 seeds worth $20 each; totalPrice goes from $56 to $68 */
    };

    // Update the order
    await newOrder.update({
      completedFlag,
      totalPrice: ordertotalPrice
    });

    return newOrder.id;
  }

}

module.exports = {
  AcquireCart, ClearIncompleteOrder, PopulateIncompleteOrder
}
