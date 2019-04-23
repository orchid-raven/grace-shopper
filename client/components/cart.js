import React, {Component} from 'react'
import {
  getCartItemsThunk,
  checkoutCartThunk,
  removeFromCartThunk
} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends Component {
  componentDidMount() {
    this.props.onloadCart()
  }

  render() {
    console.log(this.props.cart);
    if (this.props.cart.length > 0) {
      return (
        <div className="cart-container">
          <div className="shopping-cart-label">
            Shopping Cart({this.props.cart.length})
          </div>
          {this.props.cart.map(product => {
            return (
              <div className="single-cart-item" key={product.id}>
                <img src={product.imgUrl} />
                <div className="single-cart-content">
                  <div>{product.name}</div>
                  <div>Price: {product.price / 100}</div>
                  <button
                    className="remove-from-cart"
                    type="button"
                    value={product.id}
                    onClick={() => this.props.onDelete(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
          <div>
            <button type="button" onClick={this.props.onCheckout}>
              Checkout Cart
            </button>
          </div>
        </div>
      )
    } else {
      return <div>Current cart is empty</div>
    }
  }
}
const mapStateToProps = state => ({
  cart: state.cart.cart
})

const mapDispatchToProps = dispatch => ({
  onloadCart: () => {
    dispatch(getCartItemsThunk())
  },
  onCheckout: () => {
    dispatch(checkoutCartThunk())
  },
  onDelete: id => {
    dispatch(removeFromCartThunk(id))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
