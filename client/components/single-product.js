import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/products'
import {addToCartThunk} from '../store/cart'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.onloadProduct(
      this.props.match.params.itemType,
      this.props.match.params.id
    )
  }

  render() {
    let product = this.props.product[0]
    if (product) {
      return (
        <div className="single-product-item">
          <img src={this.props.product[0].imgUrl} />

          <div className="single-product-content">
            <div>{this.props.product[0].name}</div>
            <div className="price">Price: ${product.price / 100} </div>

            <button
              className="add-to-cart"
              type="submit"
              onClick={() => this.props.onAddToCart(product)}
            >
              Add To Cart
            </button>
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
  },
  onAddToCart: product => {
    dispatch(addToCartThunk(product))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
