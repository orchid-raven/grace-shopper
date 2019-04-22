import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

// Gameplan - Create a table that lists each product details for the checked out order

// Table will have these columns:
//  - Item Name
//  - Quantity
//  - Price
//  - Item Total


class OrderReceipt extends Component {

  componentDidMount() {

  }

  render(){
    // let {products} =  this.props.order
    return (
    <div>
      <h3>Order Receipt</h3>
      <h5>Invoice Number: {/* order */}</h5>
      <table>
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Item Total</th>
        </tr>
        {/* products.map(product => (

          <tr>
            <td>product.name</td>
            <td>product['order-product']['quantity']</td>
            <td>`$${product.price}`</td>
            <td>`$${product['order-product']['price']}`</td>
          </tr>

          ))
        */}
      </table>
    </div>);
  }
}



export default OrderReceipt;
