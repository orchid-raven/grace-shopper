import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllProductsByTypeThunk} from '../store/products'

class AllProductsByType extends Component {
  componentDidMount() {
    this.props.onLoadProducts(this.props.match.params.itemType);
  }

  render() {
    console.log(this.props.products);
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
});

const mapDispatchToProps = dispatch => ({
  onLoadProducts: (itemType) => {
    dispatch(getAllProductsByTypeThunk(itemType));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsByType);
