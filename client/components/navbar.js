import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getAllCartItemsThunk} from '../store/cart'

class Navbar extends Component {
  componentDidMount() {
    this.props.onLoadCart()
  }
  componentDidUpdate(prevProps) {
    console.log('previous props', prevProps)
  }
  render() {
    const {handleClick, isLoggedIn} = this.props
    return (
      <div>
        <nav>
          <Link to="/home">
            <img src="/images/logo/Orchid-Raven-Logo.png" />
          </Link>
          <div>
            <div className="nav-left">
              <Link className="nav-item" to="/products/featured">
                Featured Products
              </Link>
              <Link className="nav-item" to="/products">
                All Products
              </Link>
              <Link className="nav-item" to="/products/flower">
                Flowers
              </Link>
              <Link className="nav-item" to="/products/seed">
                Seeds
              </Link>
              <Link className="nav-item" to="/products/pot">
                Pots
              </Link>
              <Link className="nav-item" to="/products/gardening%20equipment">
                Gardening Equipment
              </Link>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="nav-right">
              {/* The navbar will show these links after you log in */}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/cart">
                Cart<i className="fas fa-shopping-cart" /> ({
                  this.props.cart.length
                })
              </Link>
            </div>
          ) : (
            <div className="nav-right">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">
                Cart<i className="fas fa-shopping-cart" />
              </Link>
            </div>
          )}
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart.cart
  }
}

const mapDispatch = (dispatch, ownProps) => {
  console.log(ownProps)
  return {
    handleClick() {
      dispatch(logout())
    },
    onLoadCart: () => {
      dispatch(getAllCartItemsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
