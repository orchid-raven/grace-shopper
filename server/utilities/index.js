const {Order, Product, OrderProduct} = require('../db/models/');

const AcquireCart = async (session) => {

  let prevOrder = await Order.findOne({where:{
    userId: session.passport.user,
    completedFlag: false
  }});

  // let cartProducts = await Product.findAll({

  //   include: [{
  //     Model: OrderProduct
  //     }, {where: {
  //       orderId: prevOrder.id,
  //       }}]
  // });

  let cartProducts = await prevOrder.getProducts(); //an array
  console.log("ARRAY OF CART PRODUCTS -----> ",cartProducts);
  console.log("order-product prop ---------> " ,cartProducts[0]['order-product']);




}

//   let cartProductsId = cartProducts.reduce((acc, prod) => {
//     acc.push({
//       // id
//       // name
//       // price
//       // imgUrl
//     });
//     return acc;
//   },[])
// }

const ClearIncompleteOrder = async (session, prevOrder) => {

  // let prevOrder = await Order.findOne({
  //   userId: session.passport.user,
  //   completedFlag: false
  // });

  if(prevOrder) {
    let prevProductsToClear = await OrderProduct.findAll({where: {
      orderId: prevOrder.id
    }});
    for(let i = 0; i < prevProductsToClear.length; i++) {
      await prevProductsToClear[i].destroy();
    }
  }
}

module.exports = {
  ClearIncompleteOrder, AcquireCart
}
