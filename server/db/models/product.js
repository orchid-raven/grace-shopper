const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product',{
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  productType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['flower','seed','pot','gardening equipment']]
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: `/images/product/Generic.jpg`
  },
  featured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Product.loadSeed = function (encoding) {
  let prodArr = [];
  encoding.split('/').forEach(prodEncoding => {
    let prodEncodingProperty = prodEncoding.split(':');
    prodArr.push({
      name: prodEncodingProperty[0],
      price: prodEncodingProperty[1],
      productType: prodEncodingProperty[2],
      featured: prodEncodingProperty[3],
      imgUrl: `/images/product/${prodEncodingProperty[4]}`,
    });
  });
  return prodArr;
};

module.exports = Product;
