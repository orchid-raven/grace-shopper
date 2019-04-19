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
    console.log("order-product prop ---------> " ,cartProducts[0]['order-product'].quantity);

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

module.exports = {
  ClearIncompleteOrder, AcquireCart
}
