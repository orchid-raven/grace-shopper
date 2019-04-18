import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsByTypeThunk} from '../store/products'
import {Link} from 'react-router-dom'

class AllProductsByType extends Component {
  componentDidMount() {
    this.props.onLoadProducts(this.props.match.params.itemType)
  }

  render() {
    return (
      <div className="products-by-type">
        {this.props.products.map(product => {
          return (
            <div className="single-product-by-type" key={product.id}>
              <div>{product.name}</div>
              <img src={product.imgUrl} />
              <Link to={`/products/${product.productType}/${product.id}`}>
                button
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.productsByType
})

const mapDispatchToProps = dispatch => ({
  onLoadProducts: itemType => {
    dispatch(getAllProductsByTypeThunk(itemType))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsByType)
