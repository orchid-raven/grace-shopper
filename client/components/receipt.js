import React, {Component} from 'react'
import {getSingleOrderThunk} from '../store/order'
import {connect} from 'react-redux'
import axios from 'axios'

class OrderReceipt extends Component {

  componentDidMount() {
    this.props.onloadOrder(this.props.match.params.orderId);
  }

  render(){
    let {order} =  this.props
    let {products} =  this.props
    console.log(this.props.order);
    console.log(products);

    if(products[0]){
    return (
    <div className="ReceiptContainer">
      <div className="ReceiptHeading">
        <h1>Thank You For Shopping at Orchid Raven!</h1>
        <h5>Date: {Date(Date.now())}</h5>
      </div>
      <div className="far fa-check-circle fa-7x"></div>
      <h3>Order Receipt</h3>
      <h5>Invoice Number: {order.id}</h5>
      <table className = "ReceiptTable">
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Item Total</th>
        </tr>

        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product['order-product'].quantity}</td>
            <td>${product.price/100}</td>
            <td>${Number(product['order-product'].price)/100}</td>
          </tr>
          ))}

          <tr>
            <td colSpan="3">Grand Total: </td>
            <td>${order.totalPrice/100}</td>
          </tr>
      </table>
    </div>);
    }
    else
      return(<div></div>)
  }
}

const mapStateToProps = state => ({
  order: state.order.singleOrder,
  products: state.order.singleOrder.products
})

const mapDispatchToProps = dispatch => ({
  onloadOrder: (id) => {
    dispatch(getSingleOrderThunk(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderReceipt);
