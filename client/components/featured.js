import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFeaturedProductsThunk} from '../store/products'

class FeaturedProducts extends Component {
  componentDidMount() {
    this.props.onLoadProducts()
  }

  render() {
    return (
      <div>
        <h2 className="featured-products-label">Featured Products</h2>
        <div className="featured-container">
          {this.props.products.map(product => {
            return (
              <div className="featured-product" key={product.id}>
                <div>{product.name}</div>
                <img src={product.imgUrl} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.featuredProducts
})

const mapDispatchToProps = dispatch => ({
  onLoadProducts: () => {
    dispatch(getFeaturedProductsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts)
