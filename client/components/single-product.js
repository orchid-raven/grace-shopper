import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/products'

class SingleProduct extends Component {
  componentDidMount() {

  }

  render() {
    return <div>single product</div>
  }
}

const mapStateToProps = state => ({
    products: state.products.singleProduct
})

const mapDispatchToProps = dispatch => ({
    
})

export default SingleProduct
