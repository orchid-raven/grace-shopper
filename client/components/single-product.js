import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.onloadProduct(
      this.props.match.params.itemType,
      this.props.match.params.id
    )
  }

  render() {
    console.log('Props: ', this.props.product[0])
    let product = this.props.product[0]
    if (product) {
      return (
        <div>
          {this.props.product[0].name}
          <div>
          <img src={this.props.product[0].imgUrl} />
          </div>
        </div>
      )
    } else {
      return <div>Component is loading</div>
    }
  }
}

const mapStateToProps = state => ({
  product: state.products.singleProduct
})

const mapDispatchToProps = dispatch => ({
  onloadProduct: (itemType, id) => {
    dispatch(getSingleProductThunk(itemType, id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
