import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/products'
import axios from 'axios';

class SingleProduct extends Component {
  // constructor() {
  //   super();
  //   this.handleAddToCart = this.bind.handleAddToCart(this);
  // }

  componentDidMount() {
    this.props.onloadProduct(
      this.props.match.params.itemType,
      this.props.match.params.id
    )
  }

  handleAddToCart = async (evt) => {
    // prevent default if submit
    // take our current product
    // find product id
    // push that product ID into cart - use route somehow
    // allow dupes

    evt.preventDefault();
    let product = this.props.product[0];
    //invoke addToCart route
    await axios.put('/api/products/cart/add',{
      id: product.id,
      name: product.name,
      price: product.price
    });
  }

  render() {
    console.log('Props: ', this.props.product[0])
    let product = this.props.product[0]
    if (product) {
      return (
        <div>
          {this.props.product[0].name}
          <div>
          <img src={this.props.product[0].imgUrl} />
          <button type = "submit" onClick={this.handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )
    } else {
      return <div>Component is loading</div>
    }
  }
}

const mapStateToProps = state => ({
  product: state.products.singleProduct
})

const mapDispatchToProps = dispatch => ({
  onloadProduct: (itemType, id) => {
    dispatch(getSingleProductThunk(itemType, id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
