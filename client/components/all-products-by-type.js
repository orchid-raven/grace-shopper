import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsByTypeThunk} from '../store/products'
import {Link} from 'react-router-dom'

class AllProductsByType extends Component {
  componentDidMount() {
    this.props.onLoadProducts(this.props.match.params.itemType)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.itemType !== this.props.match.params.itemType) {
      this.props.onLoadProducts(this.props.match.params.itemType)
    }
  }

  render() {
    return (
      <div className="products-by-type">
        {this.props.products.map(product => {
          return (
            <div className="single-product-by-type" key={product.id}>
              <div className="product-by-type-name">{product.name}</div>

              <Link to={`/products/${product.productType}/${product.id}`}>
                <img src={product.imgUrl} />
              </Link>
              <div className="overlay"> View {product.name}! </div>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoadProducts: itemType => {
    const productId = ownProps.match.params.itemType
    dispatch(getAllProductsByTypeThunk(itemType))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsByType)
