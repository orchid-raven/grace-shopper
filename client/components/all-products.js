import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.onLoadProducts()
  }

  render() {
    return (
      <div className="products-container">
        {this.props.products.map(product => {
          return (
            <div className="single-product" key={product.id}>
              <div className="product-name">{product.name}</div>
              <Link to={`/products/${product.productType}/${product.id}`}>
                <img src={product.imgUrl} />
                <div className="overlay"> View {product.name}! </div>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  onLoadProducts: () => {
    dispatch(getAllProductsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
