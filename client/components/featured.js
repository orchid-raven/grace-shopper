import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFeaturedProductsThunk} from '../store/products';

class FeaturedProducts extends Component{
  componentDidMount() {
    this.props.onLoadProducts();
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
  products: state.products.featuredProducts
})

const mapDispatchToProps = dispatch => ({
  onLoadProducts: () => {
    dispatch(getFeaturedProductsThunk())
  }
})

export default connect (mapStateToProps, mapDispatchToProps) (FeaturedProducts);
