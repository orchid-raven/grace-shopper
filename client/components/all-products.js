import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'

class AllProducts extends Component {
  componentDidMount() {
    this.props.onLoadProducts()
  }

  render() {
    return (
      <div className='row'>
      <div className='container'>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
             <div className='product-image'> <img src={product.imgUrl} /> </div>
            </div>
          )
        })}
      </div>
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
