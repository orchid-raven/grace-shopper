import React, {Component} from 'react'
import axios from 'axios'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }

  handleRemoveFromCart = async evt => {
    let {data} = await axios.put('/api/cart/delete', {
      id: evt.target.value
    })
    this.setState({
      cart: data
    })
  }

  handleCheckoutCart = async () => {
    const {data} = await axios.get('/api/cart/checkout');
    this.setState({
      cart: data
    })
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/cart');
    this.setState({
      cart: data
    })
  }

  render() {
    if (this.state.cart.length > 0) {
      return (
        <div>
          {this.state.cart.map(product => {
            return (
              <div key={product.id}>
                <div>{product.name}</div>
                <div>Price: {product.price/100}</div>
                <img src={product.imgUrl} />
                <button
                  type="button"
                  value={product.id}
                  onClick={this.handleRemoveFromCart}>
                  Remove
                </button>
              </div>
            )
          })}
          <div>
            <button
              type="button"
              onClick={this.handleCheckoutCart}>
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

export default Cart
