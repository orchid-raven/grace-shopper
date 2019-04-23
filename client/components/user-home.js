import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getFeaturedProductsThunk} from '../store/products'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    this.props.onLoadProducts()
  }
  render() {
    if (this.props.email) {
      return (
        <div>
          <div className="welcome-box">
            <h3>Welcome, {this.props.email}</h3>
          </div>
          <h2 className="featured-products-label">Featured Products</h2>
          <div className="featured-container">
            {this.props.featuredProducts.map(product => {
              return (
                <div className="featured-products" key={product.id}>
                  <div>{product.name}</div>
                  <div>
                    <img src={product.imgUrl} />{' '}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h2 className="featured-products-label">Featured Products</h2>
          <div className="featured-container">
            {this.props.featuredProducts.map(product => {
              return (
                <div className="featured-products" key={product.id}>
                  <div>{product.name}</div>
                  <div>
                    <img src={product.imgUrl} />{' '}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    featuredProducts: state.products.featuredProducts
  }
}

const mapDispatch = dispatch => {
  return {
    onLoadProducts: () => {
      dispatch(getFeaturedProductsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
