import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'

class AllProducts extends Component {
  componentDidMount() {
    this.props.onLoadProducts()
  }

  render() {
    return (
      <div>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
              <img src={product.imgUrl} />
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
