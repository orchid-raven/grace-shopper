import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getFeaturedProductsThunk} from '../store/products'

/**
 * COMPONENT
 */
class UserHome extends Component {
  // const {email} = props
  // console.log(props);
  componentDidMount() {
    this.props.onLoadProducts()
  }
  render() {
    return (
      // <div>
      //   <h3>Welcome, {email}</h3>
      // </div>
      <div className="userhome-container">
        {this.props.featuredProducts.map(product => {
          return (
            <div className='home-featured-products' key={product.id}>
              <div className='featured-products-name'>{product.name}</div>
             <div className='product-image'> <img src={product.imgUrl} /> </div>
            </div>
          )
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log('state', state);
  return {
    // email: state.user.email
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
