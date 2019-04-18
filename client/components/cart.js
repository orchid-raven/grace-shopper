import React, {Component} from 'react'
import axios from 'axios'
import {getAllCartItemsThunk, deleteCartItemThunk} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }

  // handleRemoveFromCart = async evt => {
  //   let {data} = await axios.put('/api/cart/delete', {
  //     id: evt.target.value
  //   })
  //   this.setState({
  //     cart: data
  //   })
  // }
  // handleRemoveFromCart = evt => {
  //   this.props.onDeleteItem()
  // }
  // handleCheckout

  // async componentDidMount() {
  //   const {data} = await axios.get('/api/cart')
  //   this.setState({
  //     cart: data
  //   })
  // }

  // moves the state to redux so we can get it in the main nav
  componentDidMount() {
    this.props.onLoadCart()
  }

  render() {
    console.log('state props!! ', this.props)
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
                  <div>Price: {product.price}</div>
                  <button
                    className="remove-from-cart"
                    type="button"
                    value={product.id}
                    onClick={this.props.onDeleteItem}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
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
  onLoadCart: () => {
    dispatch(getAllCartItemsThunk())
  },
  onDeleteItem: evt => {
    let id = evt.target.value
    console.log(id)
    dispatch(deleteCartItemThunk(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
